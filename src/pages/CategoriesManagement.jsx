import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesManagement = () => {
  const [form, setForm] = useState({ name: '' });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryName = form.name.trim();
    
    // Validation
    if (!categoryName) {
      setError('Please enter a category name');
      return;
    }
    
    // Check if category already exists
    const categoryExists = categories.some(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (categoryExists) {
      setError('A category with this name already exists');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Adding category:', categoryName);
      
      const response = await axios.post(
        'http://localhost:3000/categories', 
        { name: categoryName },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          validateStatus: function (status) {
            return status < 500; // Resolve only if status code is less than 500
          }
        }
      );
      
      console.log('Add category response:', response);
      
      if (response.status >= 200 && response.status < 300) {
        // Success
        await fetchCategories(); // Refresh the categories list
        setForm({ name: '' });
        // Show success message
        setError('');
        // You could also show a success message here if needed
      } else {
        // Handle API error responses
        const errorMessage = response.data?.message || 'Failed to add category';
        console.error('API Error:', errorMessage);
        setError(`Error: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Network/Request error:', err);
      setError(`Network error: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError('Invalid category ID');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Delete response:', response.data);
      
      if (response.status === 200 || response.status === 204) {
        // Refresh the categories list
        await fetchCategories();
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(`Failed to delete category: ${err.response?.data?.message || err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Category</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter category name"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading || !form.name.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          {isLoadingCategories ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No categories found. Add your first category above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category._id || category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(category._id || category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement; 