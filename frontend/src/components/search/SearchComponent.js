import React, { useState } from 'react';
import { searchDebates } from '../../api/api'; 
import './SearchComponent.css';

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
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    setError(null);
    try {
      const data = await searchDebates(searchParams);
      setSearchResults(data);
    } catch (err) {
      console.error("Error during search:", err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="search-component-container">
      <h2>Search Debates</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="keyword"
          placeholder="Keyword"
          value={searchParams.keyword}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={searchParams.category}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={searchParams.date}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSearching}>Search</button>
      </form>
      {isSearching ? <p>Searching...</p> : error ? <p className="error">{error}</p> : (
        <ul>
          {searchResults.length > 0 ? (
            searchResults.map((debate) => (
              <li key={debate.id}>
                <h3>{debate.title}</h3>
                <p>Date and Time: {debate.dateTime}</p>
                <p>Status: {debate.status}</p>
                <p>Category: {debate.topicCategory}</p>
              </li>
            ))
          ) : <p>No results found.</p>}
        </ul>
      )}
    </section>
  );
};

export default SearchComponent;
