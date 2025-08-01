import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Order from "./pages/Order.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ProductsManagement from "./pages/ProductsManagement.jsx";
import OrdersManagement from "./pages/OrdersManagement.jsx";
import UsersManagement from "./pages/UsersManagement.jsx";
import CategoriesManagement from "./pages/CategoriesManagement.jsx";
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div>
      <main>
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
