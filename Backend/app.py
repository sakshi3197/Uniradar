import json
import jwt
import mysql.connector
from functools import wraps
import os
from flask import Flask, Response, jsonify, request
from flask_api import status
from flask_cors import CORS


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "https://uniradar-frontend.netlify.app/"}})
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", None)
# Establish a connection to the MySQL server
conn = mysql.connector.connect(
    host='110.173.184.228',  # Replace with your MySQL server hostname or IP address
    user='root',  # Replace with your MySQL username
    password='spk67890',  # Replace with your MySQL password
    database='uniradar'  # Replace with the name of your MySQL database
)


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
            print(token)
        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(
                token, str(app.config['SECRET_KEY']), algorithms=["HS256"])
            print("DATA is------------- ", data)
            cursor = conn.cursor()

            sql = "SELECT email FROM accounts where email = %s"
            val = (data['email'],)

            cursor.execute(sql, val)

            rows = cursor.fetchall()

            cursor.close()

            if len(rows) == 0:
                return jsonify({'message': 'token is invalid'})

        except:
            return jsonify({'message': 'token is invalid'})
        print(data['email'], "------------")
        return f(data['email'], *args, **kwargs)
    return decorator


@app.route('/')
def index():
    return "Hello Uniradar"



@app.route('/search_unis', methods=['POST'])
def search_unis():
    response = Response(mimetype='application/json')
    form = request.get_json()
    print("Form Data:", form)
    if request.method == 'POST':

        country = '%%'
        univers = '%%'
        year = 2022
        rank = 30

    # if 'country' in request.form:
        country = str(form['country'])
        if country == "":
            country ='%%'

    # if 'year' in request.form:
        year = form['year']
        if year == "":
            year=2022
        else:
            year = int(year)

    # if 'rank' in request.form:
        rank = form['rank']
        if rank == "":
            rank=30
        else:
            rank = int(rank)


    # if 'university_name' in request.form:
        univers = form['university_name']
        if univers == "":
            univers = '%%'
        else:
            univers = "%"+str(form['university_name'])+"%"
        cursor = conn.cursor()
        
        results = cursor.execute("""
                SELECT DISTINCT u.university,z.rank_year,z.uni_score,u.link,c.country,u.city,r.region,u.logo,
                    x.unitype,q.research_output,u.student_faculty_ratio,u.international_students,s.size,u.faculty_count
                    from universities u, countries c, regions r ,sizes s, research_outputs q, rankings z, unitypes x
                     where
                    u.university LIKE %s 
                     and
                    c.country = (SELECT country from countries where u.country_id=countries.id and country LIKE %s )
                    and
                    z.rank_year = (SELECT rank_year from rankings where rankings.rank_year = %s and rankings.university_id = u.id)
                    and
                    z.uni_score= (SELECT uni_score from rankings where rankings.rank_year = %s and rankings.university_id = u.id)
                    AND
                    r.region = (SELECT region from regions where regions.id=u.region_id)
                    AND
                    x.unitype = (SELECT unitype from unitypes where u.unitype_id=unitypes.id)
                    AND
                    q.research_output = (SELECT research_output from research_outputs where research_outputs.id=u.research_output_id)
                    AND
                    s.size = (SELECT size from sizes where sizes.id =u.size_id)
                    ORDER BY z.uni_score desc LIMIT %s;
                
                  
                    """, (univers, country, year, year, rank,))

        # Fetch all the rows as a list of tuples
        rows = cursor.fetchall()
        lenr = (len(rows))
        # Close the cursor and connection
        cursor.close()

        reslist = ['university', 'rank_year', 'uni_score', 'link', 'country', 'city', 'region', 'logo',
                   'unitype', 'research_output', 'student_faculty_ratio', 'international_students', 'size', 'faculty_count']
        mainresponse = []
        for row in rows:
            
            tdict = {}
            for colno in range(len(row)):
                tdict[reslist[colno]] = row[colno]
            mainresponse.append(tdict)

        response.status = status.HTTP_200_OK
        response.data = json.dumps(
            {"message": "Data fetch successful", 'no_of_records': lenr, 'data': mainresponse})
        return response
    else:
        return 'POST NEEDED'


@app.route('/register', methods=['POST'])
def register():

    print("Inside register")
    response = Response(mimetype='application/json')

    form = request.get_json()
    if request.method == 'POST':

        firstname = str(form['firstname'])
        lastname = str(form['lastname'])
        email = str(form['username'])
        password = str(form['password'])

        # Insert data into register table
        cursor = conn.cursor()
        try:

            sql = "INSERT INTO accounts (firstname,lastname,email,passwrd) VALUES (%s, %s,%s,%s)"
            val = (firstname, lastname, email, password)
            cursor.execute(sql, val)
            conn.commit()
            cursor.close()
            response.status = status.HTTP_201_CREATED
            response.data = json.dumps({'message': 'Account created'})

            return response

        except:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps(
                {'message': 'Account with email already exist'})

            return response

    pass

@app.route('/fetch_details',methods=['POST'])
def feth_details():

    form = request.get_json()
    print("Form:",form)
    email = str(form['username'])

    print("Email current user:",email)

    response = Response(mimetype='application/json')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM accounts where email = %s;",(email,))

    treturn = {}
    row = cursor.fetchone()

    treturn['firstname']= row[1]
    treturn['lastname']=row[2]
    treturn['email'] = row[3]
    cursor.close()
    response.status =status.HTTP_200_OK
    response.data=json.dumps({"message":"user details fetched !","data":treturn})

    return response

@app.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        response = Response(mimetype='application/json')
        form = request.get_json()

        print("Form:",form)
        email = str(form['username'])
        password = str(form['password'])

        cursor = conn.cursor()

        sql = "SELECT email FROM accounts where email = %s"
        val = (email,)

        cursor.execute(sql, val)

        rows = cursor.fetchall()
        cursor.close()

        if len(rows) == 0:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({'message': 'email not registered'})
            return response
        else:
            cursor = conn.cursor()

            sql = "SELECT email,passwrd FROM accounts where email = %s and passwrd = %s"
            val = (email, password)

            cursor.execute(sql, val)

            rows = cursor.fetchall()
            print(rows)
            dbpasswrd = rows[0][1]

            if dbpasswrd != password:
                response.status = status.HTTP_400_BAD_REQUEST
                response.data = json.dumps({'message': 'Password incorrect!'})
                return response
            else:
                print(rows[0][0])
                #jwttoken = jwt.encode(
                #    {'email': str(rows[0][0])}, str(app.config['SECRET_KEY']), "HS256")

                response.status = status.HTTP_201_CREATED
                response.data = json.dumps(
                    {'message': 'login successfull'})
                

                return response


@app.route('/bookmark', methods=['POST'])
@token_required
def bookmark(email):

    if request.method == 'POST':
        response = Response(mimetype='application/json')

        try:

            university = request.form['university']
            rank_year = request.form['rank_year']
            uni_score = request.form['uni_score']
            link = request.form['link']
            country = request.form['country']
            city = request.form['city']
            region = request.form['region']
            logo = request.form['logo']
            unitype = request.form['unitype']
            research_output = request.form['research_output']
            student_faculty_ratio = request.form['student_faculty_ratio'] 
            if student_faculty_ratio == 'None':
                student_faculty_ratio =0.0
            international_students = request.form['international_students']
            if  international_students == 'None':
                international_students =0.0
            size = str(request.form['size'])
            print(size)
            faculty_count = request.form['faculty_count']
            if faculty_count == 'None':
                faculty_count =0.0
        except Exception as e:
            print(e)
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps(
                {'message': 'pass all the fields in form'})
            return response

        cursor = conn.cursor()

        try:
            sql = "INSERT INTO bookmarks(email, university, rank_year, uni_score, link, country, city, region, logo, unitype, research_output, student_faculty_ratio, international_students, size, faculty_count) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            val = (str(email), university, rank_year, uni_score, link, country, city, region, logo, unitype,
                   research_output, student_faculty_ratio, international_students, size, faculty_count)

            cursor.execute(sql, val)
            conn.commit()
            cursor.close()

            response.status = status.HTTP_200_OK
            response.data = json.dumps({'message': 'Record Bookmarked'})
            return response

        except Exception as e:
            print(e)
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({'message': 'Bookmark Failed'})
            return response


@app.route('/delete_account', methods=['POST'])
def delete_account():

    form = request.get_json()
    email = str(form['username'])

    response = Response(mimetype='application/json')

    cursor = conn.cursor()
    try:
        cursor.execute('DELETE FROM accounts WHERE email=%s;',(email,))
        conn.commit()

    except Exception as e:
        print("Error:", e)
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({'message':'Account does not exist'})
        return response
    
    response.data = json.dumps({'message':'Account Deleted'})
    return response

@app.route('/update_user', methods=['POST'])
def update_user():

    form = request.get_json()
    firstname = str(form['firstname'])
    lastname = str(form['lastname'])
    email = str(form['email'])

    response = Response(mimetype='application/json')

    cursor = conn.cursor()
    try:
        cursor.execute('UPDATE accounts SET firstname = %s, lastname =%s WHERE email=%s;',(firstname, lastname, email))
        conn.commit()

    except Exception as e:
        print("Error:", e)
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({'message':'ERROR'})
        return response
    
    response.data = json.dumps({'message':'Details Updated'})
    return response

        
if __name__ == "main":
    app.run()
