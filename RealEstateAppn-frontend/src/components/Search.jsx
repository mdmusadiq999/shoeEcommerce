import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      let response;
      if (keyword && !category && !priceRange) {
        response = await axios.get(`http://localhost:8080/products/brand/${brand}`);
      } else if (!keyword && category && !priceRange) {
        response = await axios.get(`http://localhost:8080/search/category/${category}`);
      } else if (!keyword && !category && priceRange) {
        response = await axios.get(`http://localhost:8080/search/price/${priceRange}`);
      } else if (category && priceRange) {
        response = await axios.get(`http://localhost:8080/search/${category}/${priceRange}`);
      } else {
       window.alert.error("Invalid search criteria");
        return;
      }

      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row g-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search for shoes..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="sneakers">Sneakers</option>
            <option value="boots">Boots</option>
            <option value="heels">Heels</option>
            <option value="Loafers">loafers</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Price Range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
