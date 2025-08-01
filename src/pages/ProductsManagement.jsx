import React, { useState } from 'react';

const sampleProducts = [
  {
    id: 1,
    name: 'Apple iPhone 6s 64 GB Silver',
    price: 3000,
    description: 'iPhone 6s cloud closed 64 gb Megenagha',
    location: 'Addis Ababa, Bole',
    category: 'Used',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
  },
  // Add more sample products as needed
];

const ProductCard = ({ product, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer border hover:shadow-lg transition"
    onClick={onClick}
  >
    <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
    <div className="p-4">
      <div className="text-green-600 font-bold text-lg mb-1">ETB {product.price.toLocaleString()}</div>
      <div className="font-semibold text-gray-900 text-base mb-1">{product.name}</div>
      <div className="text-gray-600 text-sm mb-1">{product.description}</div>
      <div className="flex items-center text-gray-500 text-xs mb-2">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" /></svg>
        {product.location}
      </div>
      <span className="inline-block bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full font-semibold">{product.category}</span>
    </div>
  </div>
);

const AddProductForm = () => (
  <form className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-xl font-bold mb-4">Add Product</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Name</label>
      <input className="w-full border rounded px-3 py-2" type="text" placeholder="Product Name" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Price</label>
      <input className="w-full border rounded px-3 py-2" type="number" placeholder="Product Price" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Description</label>
      <textarea className="w-full border rounded px-3 py-2" placeholder="Product Description" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Product Images</label>
      <input className="w-full border rounded px-3 py-2" type="file" accept="image/*" multiple />
    </div>
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
  </form>
);

const EditProductForm = ({ product, onBack }) => (
  <form className="bg-white p-6 rounded-lg shadow-md mb-8">
    <button type="button" onClick={onBack} className="mb-4 text-blue-600 hover:underline">&larr; Back to Products</button>
    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Name</label>
      <input className="w-full border rounded px-3 py-2" type="text" defaultValue={product.name} />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Price</label>
      <input className="w-full border rounded px-3 py-2" type="number" defaultValue={product.price} />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Description</label>
      <textarea className="w-full border rounded px-3 py-2" defaultValue={product.description} />
    </div>
    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Save Changes</button>
  </form>
);

const DeleteProductConfirm = ({ product, onBack }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    <button type="button" onClick={onBack} className="mb-4 text-blue-600 hover:underline">&larr; Back to Products</button>
    <h2 className="text-xl font-bold mb-4">Delete Product</h2>
    <p>Are you sure you want to delete <span className="font-semibold">{product.name}</span>?</p>
    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
  </div>
);

const ProductList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md mt-8">
    <h2 className="text-xl font-bold mb-4">Product List</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

const ProductsManagement = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Products Management</h1>
      <div className="flex border-b mb-8">
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'add' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-green-600'}`}
          onClick={() => { setActiveTab('add'); setEditProduct(null); setDeleteProduct(null); }}
        >
          Add
        </button>
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'edit' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-yellow-600'}`}
          onClick={() => { setActiveTab('edit'); setEditProduct(null); setDeleteProduct(null); }}
        >
          Edit
        </button>
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'delete' ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-red-600'}`}
          onClick={() => { setActiveTab('delete'); setEditProduct(null); setDeleteProduct(null); }}
        >
          Delete
        </button>
      </div>
      {activeTab === 'add' && <AddProductForm />}
      {activeTab === 'edit' && !editProduct && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => setEditProduct(product)} />
          ))}
        </div>
      )}
      {activeTab === 'edit' && editProduct && (
        <EditProductForm product={editProduct} onBack={() => setEditProduct(null)} />
      )}
      {activeTab === 'delete' && !deleteProduct && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => setDeleteProduct(product)} />
          ))}
        </div>
      )}
      {activeTab === 'delete' && deleteProduct && (
        <DeleteProductConfirm product={deleteProduct} onBack={() => setDeleteProduct(null)} />
      )}
      <ProductList />
    </div>
  );
};

export default ProductsManagement; 