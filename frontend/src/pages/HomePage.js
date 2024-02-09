import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-500 text-white flex flex-col items-center justify-center p-4">
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">Welcome to the Debate Platform</h1>
        <p className="mb-8">A place to share your views and engage in meaningful discussions.</p>
        <div>
          <Link to="/auth/login" className="inline-block bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 hover:scale-105 transition-transform duration-200 ease-in-out mr-2">Sign In</Link>
          <Link to="/auth/register" className="inline-block text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 hover:scale-105 transition-all duration-200 ease-in-out">Register</Link>
        </div>
      </main>

      <section className="mt-12 p-8 bg-white text-blue-500 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p>Our platform empowers individuals to express their opinions, learn from diverse perspectives, and participate in vibrant debates on current issues.</p>
      </section>
    </div>
  );
};

export default HomePage;
