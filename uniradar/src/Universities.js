import React, { useState, useEffect } from "react";
import './Universities.css';
import { BsBookmark, BsFillBookmarkFill, BsSearch} from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import styled from "styled-components";
import Cookies from 'js-cookie';


const Universities = () => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    year: '',
    country: '',
    rank: '',
    university_name: ''
  });

  const [universities, setUniversities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [rankFilter, setrankFilter] = useState(0);


  useEffect(() => {
    fetch("/sample.json")
      .then((response) => response.json())
      .then((data) => setUniversities(data));
  }, []);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (uni) => {
    const existingIndex = bookmarks.findIndex((b) => b.university === uni.university && b.country === uni.country);
    if (existingIndex > -1) {
      const newBookmarks = [...bookmarks];
      newBookmarks.splice(existingIndex, 1);
      setBookmarks(newBookmarks);
    } else {
      setBookmarks([...bookmarks, uni]);
    }
  };

  const isBookmarked = (uni) => {
    return bookmarks.some(
      (b) =>
        b.university === uni.university && b.country === uni.country
    );
  };

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.university.toLowerCase().includes(searchText.toLowerCase())


  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.country = countryFilter
      formData.year = yearFilter
      formData.rank = rankFilter
      formData.university_name = searchText

      console.log("FORM DATA:", formData)
      /*const response = */
      var apidata;
      await axios.post('https://healthmate-backend.onrender.com/search_unis', formData).then(response => {
        apidata = response;
        console.log(response)
      });
      console.log("Response here is : ", apidata)
      if (apidata.status === 200) {
        console.log('Success! The response is 200');

        if (apidata.no_of_records === 0) {
          alert("No records for these filters. Please modify your filters and try again !")
          navigate('/Universities')
        }
        else {
          setUniversities(apidata.data.data)
        }

      }
      else {
        console.log(`Heree Error: The response is ${apidata.status}`);
      }

      navigate('/Universities');

    } catch (error) {
      console.error("ERROOOOORRR :", error);
      alert('ERROR.');
    }
  };

  
  const isSessionLoggedIn = Cookies.get('isSessionLoggedIn');
  if (isSessionLoggedIn === "true") {
    return (
      <div className="universities-container">
        <form onSubmit={handleSubmit}>
          <div class="filters-container">
            <div class="filter-item">
              <label for="search-text">University:</label>
              <input
                type="text"
                id="search-text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div class="filter-item">
              <label for="region-filter">Year:</label>
              <select
                id="region-filter"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">Ranking Years</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div class="filter-item">
              <label for="country-filter">Country:</label>
              <select
                id="country-filter"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <option value="">All countries</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
              </select>
            </div>
            <div class="filter-item">
              <label for="num-universities-filter">Top:</label>
              <input
                type="range"
                min="1"
                max="100"
                value={rankFilter}
                onChange={(e) => setrankFilter(parseInt(e.target.value))}
                id="num-universities-filter"
              />
              <span>{rankFilter}</span>
            </div>
            <Button
              type="submit"
              style={{ backgroundColor: "#674ea7", marginLeft: "10px" }}
            >
              <BsSearch className="cart-trolley" />
            </Button>

          </div>
        </form>
        <div className="universities-table-container">
          <table className="universities-table">
            <thead>
              <tr>
                <th>University</th>
                <th>Score</th>
                <th>Country</th>
                <th>City</th>
                <th>Region</th>
                <th>Size</th>
                <th>Type</th>
                <th>Faculty Count</th>
                <th>International Students</th>
                <th>Bookmark</th>
              </tr>
            </thead>
            <tbody>
              {filteredUniversities.map((uni, index) => (
                <tr key={index}>
                  <td>{uni.university}</td>
                  <td>{uni.uni_score}</td>
                  <td>{uni.country}</td>
                  <td>{uni.city}</td>
                  <td>{uni.region}</td>
                  <td>{uni.size}</td>
                  <td>{uni.unitype}</td>
                  <td>{uni.faculty_count}</td>
                  <td>{uni.international_students}</td>

                  <td>
                    {isBookmarked(uni) ? (
                      <BsFillBookmarkFill
                        onClick={() => toggleBookmark(uni)}
                        className="bookmark-icon"
                      />
                    ) : (
                      <BsBookmark
                        onClick={() => toggleBookmark(uni)}
                        className="bookmark-icon"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    );
  }
  else{
    return(
      <Wrapper>
      <div className="container">
        <div>
          <h3>Sign up for Free !!</h3>
          <p>
            Please click the button sign up !
          </p>

          <NavLink to="/Registration">
            <Button>Register</Button>
          </NavLink>

          <p>
            Please click here to log in if you are an existing user !
          </p>

          <NavLink to="/Login">
            <Button>Login</Button>
          </NavLink>

        </div>
      </div>
    </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;
    h2 {
      font-size: 10rem;
    }
    h3 {
      font-size: 4.2rem;
    }
    p {
      margin: 2rem 0;
    }
  }
`;


export default Universities;
