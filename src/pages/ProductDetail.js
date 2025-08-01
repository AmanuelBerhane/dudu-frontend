import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToOrder = () => {
    // Here you would implement the logic to add the product to the order
    console.log('Added to order:', { ...product, quantity });
    // You could also show a success message or redirect to the order page
    alert(`${product.name} added to order!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/products')} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-gray-600 mb-4">Product not found</div>
        <button 
          onClick={() => navigate('/products')} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-gray-700 hover:text-indigo-600"
            >
              Home
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <button 
                onClick={() => navigate('/products')} 
                className="ml-1 text-gray-700 hover:text-indigo-600 md:ml-2"
              >
                Products
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2 font-medium">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-indigo-600' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            <span className="ml-4 px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-full capitalize">{product.gender}</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Category</h2>
            <p className="text-gray-700">{product.category ? product.category.name : 'N/A'}</p>
          </div>
          
          <div className="mb-8">
            <label htmlFor="quantity" className="block text-lg font-semibold text-gray-900 mb-2">Quantity</label>
            <div className="flex items-center">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity" 
                value={quantity} 
                onChange={handleQuantityChange}
                min="1" 
                className="w-16 text-center py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToOrder}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-300 mb-4"
          >
            Add to Order
          </button>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">ID:</span> {product.id}</li>
              <li><span className="font-medium">Gender:</span> <span className="capitalize">{product.gender}</span></li>
              {/* Add more product details as needed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
