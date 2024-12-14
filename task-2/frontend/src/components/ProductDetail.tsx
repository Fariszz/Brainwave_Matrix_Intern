import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { Product } from '../types/product';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onUpdateLocation: (productId: string, location: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onUpdateLocation,
}) => {
  const [newLocation, setNewLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim()) {
      onUpdateLocation(product.id, newLocation.trim());
      setNewLocation('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
      <p className="text-xl text-gray-600 mb-6">Manufacturer: {product.manufacturer}</p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Location History</h3>
        <div className="space-y-4">
          {product.locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-600"
            >
              <MapPin size={20} />
              <span>{location}</span>
              {index === product.locations.length - 1 && (
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold">Update Location</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter new location"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Location
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Handlers</h3>
        <div className="grid grid-cols-2 gap-4">
          {product.handlers.map((handler, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-md p-3 text-gray-600"
            >
              {handler}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};