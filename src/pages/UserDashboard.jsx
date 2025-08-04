import React, { useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('user_authenticated') === 'true'
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Replace with your backend login endpoint
      await axios.post('http://localhost:3000/admin/login', form);
      localStorage.setItem('user_authenticated', 'true');
      setIsAuthenticated(true);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center font-serif">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-bold text-gray-800">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#232323] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-800">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#232323] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b2e0e] via-[#7c3aed] to-[#f59e42] text-white font-bold py-2 rounded-lg transition hover:opacity-90"
            >
              <span>→</span>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Existing dashboard content goes here
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold">Welcome to the User Dashboard!</h1>
        <p className="mt-4 text-gray-600">You are now logged in as an admin.</p>
      </div>
    </div>
  );
};

export default UserDashboard; 