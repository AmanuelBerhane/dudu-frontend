import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch order items from an API or local storage
    // For this template, we'll just initialize an empty order
    setLoading(false);
    
    // You can fetch order items from localStorage or your backend API here
    // Example:
    // const storedOrder = JSON.parse(localStorage.getItem('order') || '[]');
    // setOrderItems(storedOrder);
    // setLoading(false);

  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    
    // Update localStorage or your state management solution
    // Example: localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const handleRemoveItem = (id) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
    
    // Update localStorage or your state management solution
    // Example: localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would send the order info to your backend
    setOrderPlaced(true);
    setOrderItems([]); // Optionally clear the order
    // localStorage.removeItem('order');
  };

  const handleCreateOrder = async () => {
    try {
      // Example of creating an order - you would implement this with your backend
      const orderData = {
        order: {
          products: orderItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        }
      };
      
      // Make API call to create order
      // const response = await axios.post('http://localhost:3000/orders', orderData);
      // console.log('Order created:', response.data);
      
      // Clear order after successful order
      // setOrderItems([]);
      // localStorage.removeItem('order');
      
      // Show success message
      alert('Order would be created here!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (orderItems.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Order</h1>
        <div className="product-card p-8">
          <p className="text-xl text-gray-600 mb-6">Your order is empty</p>
          <Link 
            to="/products" 
            className="btn btn-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container-custom section-padding">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Thank you for your order!</h1>
        <p className="text-lg text-gray-700 mb-6">We have received your order and will contact you soon.</p>
        <Link 
          to="/products" 
          className="btn btn-primary"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="product-card overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{item.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1" 
                          className="w-12 text-center py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button 
              onClick={() => navigate('/products')} 
              className="btn"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Continue Shopping
            </button>
            
            <button 
              onClick={() => setOrderItems([])} 
              className="btn"
            >
              Clear Order
            </button>
          </div>
          {/* Order Button and Form */}
          {!showOrderForm && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleOrderButtonClick}
                className="btn btn-primary font-bold text-lg px-8 py-3"
              >
                Order
              </button>
            </div>
          )}
          {showOrderForm && (
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto product-card">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Enter Your Details</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                Submit Order
              </button>
            </form>
          )}
        </div>
        
        {/* Order Creation */}
        <div className="lg:col-span-1">
          <div className="product-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Order</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Review your items before creating an order.
              </p>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  By creating an order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleCreateOrder}
              className="btn btn-primary w-full mt-6"
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
