import React, { useState } from 'react';
import { searchDebates } from '../../api/api'; 

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({ keyword: '', category: '', date: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    setError('');
    try {
      const results = await searchDebates(searchParams);
      setSearchResults(results);
    } catch (error) {
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Search Debates</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="keyword"
          placeholder="Keyword"
          value={searchParams.keyword}
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="category"
          placeholder="Category"
          value={searchParams.category}
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 p-2 rounded"
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSearching}>
          Search
        </button>
      </form>
      {isSearching && <p className="text-center">Searching...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isSearching && searchResults.length > 0 && (
        <ul className="space-y-4">
          {searchResults.map((debate) => (
            <li key={debate.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{debate.title}</h3>
              <p>Date and Time: {debate.dateTime}</p>
              <p>Status: {debate.status}</p>
              <p>Category: {debate.topicCategory}</p>
            </li>
          ))}
        </ul>
      )}
      {!isSearching && searchResults.length === 0 && !error && <p>No results found.</p>}
    </div>
  );
};

export default SearchComponent;
