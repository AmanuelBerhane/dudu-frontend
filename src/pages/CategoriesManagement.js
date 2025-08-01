import React, { useState } from 'react';

const AddCategoryForm = () => (
  <form className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Add Category</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Name</label>
      <input className="w-full border rounded px-3 py-2" type="text" placeholder="Category Name" required />
    </div>
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
  </form>
);

const EditCategoryForm = () => (
  <form className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Edit Category</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Select Category</label>
      <select className="w-full border rounded px-3 py-2">
        <option>Select a category...</option>
        {/* Populate with real categories */}
      </select>
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Name</label>
      <input className="w-full border rounded px-3 py-2" type="text" placeholder="Category Name" />
    </div>
    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Save Changes</button>
  </form>
);

const DeleteCategoryForm = () => (
  <form className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Delete Category</h2>
    <div className="mb-4">
      <label className="block mb-1 font-medium">Select Category</label>
      <select className="w-full border rounded px-3 py-2">
        <option>Select a category...</option>
        {/* Populate with real categories */}
      </select>
    </div>
    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
  </form>
);

const CategoryList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md mt-8">
    <h2 className="text-xl font-bold mb-4">Category List</h2>
    <table className="min-w-full bg-white border rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Name</th>
        </tr>
      </thead>
      <tbody>
        {/* Replace with real category data */}
        <tr>
          <td className="px-4 py-2 border-b">Sample Category</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const CategoriesManagement = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Categories Management</h1>
      <div className="flex border-b mb-8">
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'add' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-green-600'}`}
          onClick={() => setActiveTab('add')}
        >
          Add
        </button>
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'edit' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-yellow-600'}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </button>
        <button
          className={`px-6 py-3 font-semibold text-lg focus:outline-none transition-colors duration-200 border-b-2 ${activeTab === 'delete' ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-red-600'}`}
          onClick={() => setActiveTab('delete')}
        >
          Delete
        </button>
      </div>
      {activeTab === 'add' && <AddCategoryForm />}
      {activeTab === 'edit' && <EditCategoryForm />}
      {activeTab === 'delete' && <DeleteCategoryForm />}
      <CategoryList />
    </div>
  );
};

export default CategoriesManagement; 