import React from 'react';

const Sidebar = () => (
  <div className="w-48 bg-gray-100 h-screen p-4">
    <h2 className="text-xl font-bold mb-4">Lading Inc</h2>
    <ul className="space-y-2">
      {['Home', 'Stores', 'Products', 'Catalogue', 'Promotions', 'Reports', 'Docs', 'Settings'].map((item) => (
        <li
          key={item}
          className={`p-2 rounded ${
            item === 'Products' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
