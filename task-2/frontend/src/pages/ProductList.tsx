import React from 'react';
import { Package, Plus } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddProduct: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelectProduct,
  onAddProduct,
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Package size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            Crypto Supply Chain Management
          </h1>
        </div>
        <button
          onClick={onAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};