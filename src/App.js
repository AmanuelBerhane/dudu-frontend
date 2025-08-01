import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Order from './pages/Order';


import UserDashboard from './pages/UserDashboard';
import ProductsManagement from './pages/ProductsManagement';
import OrdersManagement from './pages/OrdersManagement';
import UsersManagement from './pages/UsersManagement';
import CategoriesManagement from './pages/CategoriesManagement';

function App() {
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith('/user');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/products" element={<ProductsManagement />} />
          <Route path="/user/orders" element={<OrdersManagement />} />
          <Route path="/user/users" element={<UsersManagement />} />
          <Route path="/user/categories" element={<CategoriesManagement />} />


        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
