import React from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.manufacturer}</p>
      
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <MapPin size={16} />
        <span>{product.locations[product.locations.length - 1]}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <Users size={16} />
        <span>{product.handlers.length} handlers</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500">
        <Clock size={16} />
        <span>{new Date(product.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
};