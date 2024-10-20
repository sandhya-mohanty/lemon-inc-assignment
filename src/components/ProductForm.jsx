import React from 'react';

const ProductForm = ({ product }) => (
  <div className="bg-white p-4 rounded shadow">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-32 object-cover mb-2"
    />
    <h3 className="font-bold">{product.name}</h3>
    <p className="text-sm text-gray-600">
      ₹{product.price.toLocaleString()}
    </p>
    <p className="text-xs text-blue-500">{product.brand}</p>
  </div>
);

export default ProductForm;
