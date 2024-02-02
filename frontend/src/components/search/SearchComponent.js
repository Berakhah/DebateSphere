import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests
import './SearchComponent.css'; // Ensure you have corresponding CSS for styling

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    category: '',
    date: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    try {
      const response = await axios.get('http://localhost:3000/api/debates/search', {
        params: searchParams,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Retrieve the token from local storage
        }
      });
      setSearchResults(response.data);
      setError(null);
    } catch (err) {
      console.error("Error during search:", err);
      setError(err.response?.data?.message || "An error occurred during the search.");
    }
    setIsSearching(false);
  };

  return (
    <section className="search-component-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Input fields for keyword, category, date */}
        {/* Submit Button */}
        {isSearching && <p>Searching...</p>}
        {error && <p className="error">{error}</p>}
        {/* Render searchResults here */}
      </form>
    </section>
  );
};

export default SearchComponent;
