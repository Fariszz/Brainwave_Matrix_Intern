import React, { useState } from 'react';
import { ArrowLeft} from 'lucide-react';

interface AddProductProps {
  onBack: () => void;  
  setNewProduct: (name: string) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ onBack, setNewProduct }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewProduct(name);
    setName('');
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};