import React, { useState, useEffect } from "react";
import './Universities.css';
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";


const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [bookmarks, setBookmarks] = useState([]);


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
      uni.region.toLowerCase().includes(regionFilter.toLowerCase()) &&
      uni.university.toLowerCase().includes(searchText.toLowerCase()) &&
      uni.size.includes(sizeFilter) &&
      uni.unitype.toLowerCase().includes(typeFilter.toLowerCase()) &&
      uni.country.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <div className="universities-container">
      <div class="filters-container">
        <div class="filter-item">
          <label for="search-text">University Name:</label>
          <input
            type="text"
            id="search-text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div class="filter-item">
          <label for="region-filter">Continent:</label>
          <select
            id="region-filter"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All regions</option>
            <option value="north america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
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
          <label for="size-filter">Size:</label>
          <select
            id="size-filter"
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
          >
            <option value="">All sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        <div class="filter-item">
          <label for="type-filter">Type:</label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      <div className="universities-table-container">
        <table className="universities-table">
          <thead>
            <tr>
              <th>University</th>
              <th>Country</th>
              <th>City</th>
              <th>Region</th>
              <th>Size</th>
              <th>Type</th>
              <th>Faculty Count</th>
              <th>Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {filteredUniversities.map((uni, index) => (
              <tr key={index}>
                <td>{uni.university}</td>
                <td>{uni.country}</td>
                <td>{uni.city}</td>
                <td>{uni.region}</td>
                <td>{uni.size}</td>
                <td>{uni.unitype}</td>
                <td>{uni.faculty_count}</td>
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
};

export default Universities;
