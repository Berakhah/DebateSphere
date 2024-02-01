import React, { useState } from 'react';
import './SearchComponent.css'; // Ensure you have corresponding CSS for styling

const SearchComponent = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    category: '',
    date: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchParams);
  };

  return (
    <section className="search-component-container">
      <form onSubmit={handleSubmit} noValidate>
        {/* Input fields for keyword, category, date */}
        {/* Submit Button */}
      </form>
    </section>
  );
};

export default SearchComponent;
