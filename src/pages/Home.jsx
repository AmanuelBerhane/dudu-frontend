import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Adjust the URL to match your backend API endpoint
        const response = await axios.get('http://localhost:3000/products');
        // For the homepage, we'll just show a few products
        setFeaturedProducts(response.data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="pt-16">

      {/* Introduction Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Our Store</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">We offer a curated selection of high-quality clothing for everyone. Explore our collection to find your new favorite outfit.</p>
          <div className="mt-8">
            <Link to="/products" className="btn btn-primary font-bold text-lg px-8 py-3">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-xl text-gray-600">Check out our most popular items</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
