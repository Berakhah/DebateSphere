import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you have Tailwind CSS integrated

const HomePage = () => {
  return (
    <div className="homepage-container">
      <main className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white p-4">
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Debate Platform</h1>
          <p className="mb-8">A place to share your views and engage in meaningful discussions.</p>
          <div>
            <Link to="/auth/login" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition duration-200 ease-in-out mr-2">Sign In</Link>
            <Link to="/auth/register" className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 transition duration-200 ease-in-out">Register</Link>
          </div>
        </section>

        <section className="mt-12 p-8 bg-white text-blue-500 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p>Our platform empowers individuals to express their opinions, learn from diverse perspectives, and participate in vibrant debates on current issues.</p>
        </section>


      </main>
    </div>
  );
};

export default HomePage;
