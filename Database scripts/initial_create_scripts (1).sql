-- @Author: Manas Zagade {Start}
CREATE DATABASE uniradar;
USE uniradar;

CREATE TABLE accounts(
	id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL ,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwrd VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE countries(
	id INT NOT NULL AUTO_INCREMENT,
    country VARCHAR(255) NOT NULL UNIQUE,
    country_code VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE regions(
	id INT NOT NULL AUTO_INCREMENT,
    region VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE unitypes(
	id INT NOT NULL AUTO_INCREMENT,
    unitype VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE research_outputs(
	id INT NOT NULL AUTO_INCREMENT,
    research_output VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE sizes(
	id INT NOT NULL AUTO_INCREMENT,
    size VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);
-- @Author: Manas Zagade {End}

-- @Author: Adesh Oak {Start}
CREATE TABLE universities (
	id INT NOT NULL AUTO_INCREMENT,
    university VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    country_id INT NOT NULL,
    region_id INT NOT NULL,
    link VARCHAR(2083),
    logo VARCHAR(2083),
    unitype_id INT NOT NULL,
    research_output_id INT NOT NULL,
    student_faculty_ratio FLOAT,
    international_students INT,
    size_id INT NOT NULL,
    faculty_count INT,
    
    PRIMARY KEY (id),
	FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE,
	FOREIGN KEY (region_id) REFERENCES regions(id) ON UPDATE CASCADE,
	FOREIGN KEY (unitype_id) REFERENCES unitypes(id) ON UPDATE CASCADE,
	FOREIGN KEY (research_output_id) REFERENCES research_outputs(id) ON UPDATE CASCADE,
	FOREIGN KEY (size_id) REFERENCES sizes(id) ON UPDATE CASCADE
);

CREATE TABLE rankings (
	university_id INT NOT NULL,
    rank_year INT NOT NULL,
    uni_rank INT NOT NULL,
    uni_score FLOAT,
    
	PRIMARY KEY (university_id, rank_year),
	FOREIGN KEY (university_id) REFERENCES countries(id) ON UPDATE CASCADE
);
CREATE TABLE bookmarks(
	email varchar(255) NOT NULL,
	university VARCHAR(255) NOT NULL,
    rank_year INT NOT NULL,
    uni_score FLOAT NOT NULL,
    link VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    unitype VARCHAR(255) NOT NULL,
    research_output VARCHAR(255) NOT NULL,
    student_faculty_ratio FLOAT,
    international_students INT,
    size VARCHAR(1),
    faculty_count INT,
    
	FOREIGN KEY (email) REFERENCES accounts(email),
    PRIMARY KEY(email,university,city)

);


ALTER TABLE countries AUTO_INCREMENT = 0; 
ALTER TABLE regions AUTO_INCREMENT = 0; 
ALTER TABLE unitypes AUTO_INCREMENT = 0; 
ALTER TABLE research_outputs AUTO_INCREMENT = 0; 
ALTER TABLE sizes AUTO_INCREMENT = 0; 
ALTER TABLE universities AUTO_INCREMENT = 0; 
-- @Author: Adesh Oak {End}


-- @Author: Sakshi Sitoot {Start}
DELIMITER //
CREATE PROCEDURE delete_university(IN university_name VARCHAR(255))
BEGIN
    DECLARE university_id_local INT;
    SELECT id INTO university_id_local FROM universities WHERE university = university_name;
    IF university_id IS NOT NULL THEN
        DELETE FROM rankings WHERE university_id = university_id_local;
        DELETE FROM universities WHERE id = university_id_local;
        SELECT CONCAT('University "', university_name, '" and its corresponding ranking records have been deleted.') AS message;
    ELSE
        SELECT CONCAT('University "', university_name, '" not found.') AS message;
    END IF;
END //
DELIMITER ;

-- A view to show the location details of the highest-ranking universities.
CREATE VIEW highest_ranking_universities_location AS
SELECT u.university, u.city, c.country, r.region
FROM universities u
JOIN countries c ON u.country_id = c.id
JOIN regions r ON u.region_id = r.id
WHERE u.id IN (
  SELECT university_id
  FROM rankings
  WHERE rank_year = (
    SELECT MAX(rank_year)
    FROM rankings
  ) AND uni_rank <= 10
);

-- A view that shows the number of universities by country.
CREATE VIEW universities_by_country AS
SELECT countries.country, COUNT(universities.id) AS num_universities
FROM countries
LEFT JOIN universities ON universities.country_id = countries.id
GROUP BY countries.country;

-- A view that shows the top 10 universities by international student count.
CREATE VIEW top_international_universities AS
SELECT u.university, u.city, c.country, u.international_students
FROM universities u
JOIN countries c ON u.country_id = c.id
ORDER BY u.international_students DESC
LIMIT 10;
-- @Author: Sakshi Sitoot {Start}