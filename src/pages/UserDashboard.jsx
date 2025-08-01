import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple check: username: admin, password: admin123
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('user_authenticated', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">Login</button>
      </form>
    </div>
  );
};

const UserDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user_authenticated') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        {/* <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
          onClick={handleLogout}
        >
          Logout
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[28rem]">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className='flex flex-col h-full justify-between py-12'>
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            <p className="text-gray-600 mb-4">Add, edit, or remove products from your store.</p>
            <button onClick={() => navigate('/user/products')} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">Go to Products</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className='flex flex-col h-full justify-between py-12'>
            <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
            <p className="text-gray-600 mb-4">View and process customer orders.</p>
            <button onClick={() => navigate('/user/orders')} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">Go to Orders</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className='flex flex-col h-full justify-between py-12'>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <p className="text-gray-600 mb-4">View and manage registered users.</p>
            <button onClick={() => navigate('/user/users')} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">Go to Users</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className='flex flex-col h-full justify-between py-12'>
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <p className="text-gray-600 mb-4">Add, edit, or remove product categories.</p>
            <button onClick={() => navigate('/user/categories')} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300">Go to Categories</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 