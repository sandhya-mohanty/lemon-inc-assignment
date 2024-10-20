// ProductListing.js
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductForm from './components/ProductForm';
import Sidebar from './components/Sidebar';
import AddCategory from './components/AddCategory';
import AddProductForm from './components/AddProductForm';

const initialProducts = [
  {
    name: 'Nike Air Jordan',
    category: 'Shoes',
    brand: 'Nike',
    image: '/api/placeholder/100/100',
    price: 12000,
  },
  {
    name: 'Nike Dunk Low',
    category: 'Shoes',
    brand: 'Nike',
    image: '/api/placeholder/100/100',
    price: 9000,
  },
];

const initialCategories = [
  { id: 'abc', name: 'Shoes' },
  { id: 'xyz', name: 'T-shirt' },
];

const App = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleAddCategory = (newCategoryName) => {
    setCategories([
      ...categories,
      { id: Date.now().toString(), name: newCategoryName },
    ]);
    setIsAddCategoryOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex justify-between">
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-2"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <div className="space-y-4">
                {products
                  .filter((p) => p.category === category.name)
                  .map((product) => (
                    <ProductForm key={product.name} product={product} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddCategory
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSave={handleAddCategory}
      />
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <AddProductForm
              categories={categories}
              onClose={() => setIsAddProductOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;




































































































































