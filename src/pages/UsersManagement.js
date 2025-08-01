import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-16">
      <button
        className="mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
        onClick={() => navigate('/user')}
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Users Management</h1>
      <p className="text-gray-700 text-center">Here you can view and manage users.</p>
    </div>
  );
};

export default UsersManagement; 