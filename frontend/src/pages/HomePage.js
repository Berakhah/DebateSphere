import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { fetchDebates } from '../api/api';
import './HomePage.css'; 

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
    <div className="homepage-container">
      {/* <Navbar /> */}
      <main className="homepage-content">
        <section className="user-onboarding">
          <h2>User Onboarding and Management</h2>
          <p>Join our community of educators and students for a streamlined onboarding experience. Enjoy role-based access to diverse resources and tools.</p>
        </section>
        
        <section className="debate-lifecycle">
          <h2>Debate Lifecycle Management</h2>
          <p>Engage in debates using our comprehensive tools for creating, editing, and scheduling. Stay updated with real-time notifications.</p>
        </section>
        
        <section className="interactive-features">
          <h2>Interactive Debate Features</h2>
          <p>Participate in live debates, share digital evidence, and collaborate in real-time. Our platform supports both text and voice-based interactions.</p>
        </section>
        
        <section className="content-moderation">
          <h2>Comprehensive Content Moderation</h2>
          <p>Experience a safe debating environment with our advanced moderation tools and automated content filtering algorithms.</p>
        </section>
        
        <section className="search-archiving">
          <h2>Rich Search Functionality and Archiving</h2>
          <p>Discover debates and historical discussions effortlessly with our AI-powered search engine and organized archival system.</p>
        </section>
        
        <section className="current-debates">
          <h2>Current Debates</h2>
          {debates && debates.length ? (
            <ul className="debates-list">
              {debates.map((debate) => (
                <li key={debate.id} className="debate-item">
                  <h3>{debate.title}</h3>
                  <p>{debate.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No debates available at the moment.</p>
          )}
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
