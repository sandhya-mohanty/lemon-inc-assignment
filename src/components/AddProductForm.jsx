
import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

const AddProductForm = ({ categories, onClose }) => {
  const [step, setStep] = useState('Description');
  const steps = ['Description', 'Variants', 'Combinations', 'Price info'];
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    brand: '',
    image: null,
    variants: [{ option: 'Size', values: ['M', 'L', 'X'] },
           { option: 'Color', values: ['Black', 'Red'] }],
    combinations: [],
    price: 0,
    discount: 0,
  });

  useEffect(() => {
    const generateCombinations = () => {
      if (productData.variants.length === 0) return [];

      const options = productData.variants.map((v) => v.values);
      const combos = options.reduce(
        (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
        [[]]
      );

      return combos.map((combo, index) => ({
        id: index,
        sku: `SKU${index + 1}`,
        inStock: false,
        quantity: 0,
        combination: combo,
      }));
    };

    setProductData((prevData) => ({
      ...prevData,
      combinations: generateCombinations(),
    }));
  }, [productData.variants]);

  const handleNext = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const updateProductData = (field, value) => {
    setProductData({ ...productData, [field]: value });
  };

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { option: '', values: [] }],
    });
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index][field] = value;
    setProductData({ ...productData, variants: updatedVariants });
  };

  const removeVariant = (index) => {
    setProductData({
      ...productData,
      variants: productData.variants.filter((_, i) => i !== index),
    });
  };

  const handleCombinationChange = (id, field, value) => {
    const updatedCombinations = productData.combinations.map((combo) =>
      combo.id === id ? { ...combo, [field]: value } : combo
    );
    setProductData({ ...productData, combinations: updatedCombinations });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add Product</h2>

        <div className="flex space-x-2 relative">
          {step !== 'Description' && (
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Back
            </button>
          )}
          {step === 'Description' && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Cancel
            </button>
          )}
          {step === 'Price info' && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Confirm
            </button>
          )}
{step !== "Price info" && (<button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>)}
         
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        {steps.map((s, index) => (
          <div
            key={s}
            className={`flex items-center ${
              index === steps.indexOf(step) ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full ${
                index === steps.indexOf(step) ? 'bg-blue-500' : 'bg-gray-300'
              } flex items-center justify-center text-white text-xs mr-2`}
            >
              {index + 1}
            </div>
            {s}
          </div>
        ))}
      </div>

      {step === 'Description' && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product name *
            </label>
            <input
              id="productName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
              value={productData.name}
              onChange={(e) => updateProductData('name', e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={productData.category}
              onChange={(e) => updateProductData('category', e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand *
            </label>
            <input
              id="brand"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter brand name"
              value={productData.brand}
              onChange={(e) => updateProductData('brand', e.target.value)}
            />
          </div>
          <div>
            <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center">
              <Upload className="mr-2" size={16} />
              Upload Image
            </button>
          </div>
        </div>
      )}
{step === 'Variants' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Variants</h3>
          {productData.variants.map((variant, index) => (
            <div key={index} className="flex space-x-2 items-start">
              <div className="flex-1">
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Option" 
                  value={variant.option} 
                  onChange={(e) => updateVariant(index, 'option', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Values (comma-separated)" 
                  value={variant.values.join(', ')} 
                  onChange={(e) => updateVariant(index, 'values', e.target.value.split(',').map(v => v.trim()))}
                />
              </div>
              <button onClick={() => removeVariant(index)} className="px-2 py-2 border border-gray-300 rounded-md">
                <X size={16} />
              </button>
            </div>
          ))}
          <button onClick={addVariant} className="px-4 py-2 border border-gray-300 rounded-md mt-2">
            + Add Option
          </button>
        </div>
      )}

{step === 'Combinations' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Combinations</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">SKU *</th>
                <th className="px-4 py-2 text-left">In stock</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                {productData.variants.map((variant, index) => (
                  <th key={index} className="px-4 py-2 text-left">{variant.option}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productData.combinations.map((combo) => (
                <tr key={combo.id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      value={combo.sku}
                      onChange={(e) => handleCombinationChange(combo.id, 'sku', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={combo.inStock}
                      onChange={(e) => handleCombinationChange(combo.id, 'inStock', e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      type="number"
                      value={combo.quantity}
                      onChange={(e) => handleCombinationChange(combo.id, 'quantity', parseInt(e.target.value, 10))}
                    />
                  </td>
                  {combo.combination.map((value, index) => (
                    <td key={index} className="px-4 py-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       {step === 'Price info' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              id="price"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product price"
              value={productData.price}
              onChange={(e) => updateProductData('price', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
            <div className="flex">
              <input
                id="discount"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter discount"
                value={productData.discount}
                onChange={(e) => updateProductData('discount', parseFloat(e.target.value))}
              />
              <div className="flex items-center">
                <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded">%</button>
                <button className="ml-2 px-3 py-2 bg-gray-300 text-gray-800 rounded">$</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
