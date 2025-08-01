import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders Management</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="text-center">
                  <td className="px-4 py-2 border-b">{order.id}</td>
                  <td className="px-4 py-2 border-b">{order.customer_name || order.name || 'N/A'}</td>
                  <td className="px-4 py-2 border-b">{order.phone || 'N/A'}</td>
                  <td className="px-4 py-2 border-b">{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement; 