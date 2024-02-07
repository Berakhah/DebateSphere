import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getTrendingDebates, getUserStats, getRecommendedDebates } from '../api/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [trendingDebates, setTrendingDebates] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [recommendedDebates, setRecommendedDebates] = useState([]);

  useEffect(() => {
    // Fetch trending debates
    getTrendingDebates().then(data => setTrendingDebates(data));
    // Fetch user statistics
    getUserStats().then(stats => setUserStats(stats));
    // Fetch recommended debates based on user's interests
    getRecommendedDebates().then(debates => setRecommendedDebates(debates));
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dashboard-content">
        <section className="user-stats">
          <h2>Your Stats</h2>
          <p>Debates Participated: {userStats.debatesParticipated}</p>
          <p>Debates Won: {userStats.debatesWon}</p>
          <p>Points Earned: {userStats.points}</p>
        </section>
        <section className="trending-debates">
          <h2>Trending Debates</h2>
          <ul>
            {trendingDebates.map(debate => (
              <li key={debate.id}>{debate.title}</li>
            ))}
          </ul>
        </section>
        <section className="recommended-debates">
          <h2>Recommended For You</h2>
          <ul>
            {recommendedDebates.map(debate => (
              <li key={debate.id}>{debate.title}</li>
            ))}
          </ul>
        </section>
        <section className="discover-more">
          <h2>Discover More</h2>
          <p>Explore debates across a variety of topics and interests.</p>
        </section>
        <section className="about-us">
          <h2>About Us</h2>
          <p>A platform dedicated to fostering informed discussions and debates on a wide range of topics.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
