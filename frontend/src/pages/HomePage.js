import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { fetchDebates } from '../utils/api'; // Adjust the import path as needed
import './HomePage.css'; // Your CSS file for styling

const HomePage = () => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const loadDebates = async () => {
      const debatesData = await fetchDebates();
      setDebates(debatesData);
    };

    loadDebates();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Content of the home page */}
      <section className="debates-list">
        <h2>Current Debates</h2>
        {debates.length ? (
          <ul>
            {debates.map((debate) => (
              <li key={debate.id}>
                <h3>{debate.title}</h3>
                <p>{debate.description}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No debates available at the moment.</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
