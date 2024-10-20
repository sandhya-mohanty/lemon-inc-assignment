import React, { useState } from 'react';

const AddCategory = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    onSave(categoryName);
    setCategoryName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-3/12">
        <h2 className="text-xl font-bold mb-4">Add category</h2>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category name *
          </label>
          <input
            id="categoryName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="T-shirt"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
