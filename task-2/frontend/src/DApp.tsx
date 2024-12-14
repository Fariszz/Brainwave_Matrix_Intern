import React, { useEffect, useState } from 'react';
import { Product } from './types/product';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { AddProduct } from './pages/AddProduct';
import { ethers } from 'ethers';
import contractAddress from './ABI/contract-address.json';
import TokenArtifact from './ABI/SimpleSupplyChain.json';

function DApp() {  
  const [token, setToken] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

    const _initialize = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const contract = new ethers.Contract(
                contractAddress.Token,
                TokenArtifact.abi,
                signer
            );
            

            setToken(contract);
            setSigner(signer);
        } catch (error) {
            console.error("Error initializing ethers:", error);
        }
    };

    const fetchProductsByAccount = async () => {
        try {
            if (!token) throw new Error('Token is not initialized');
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const signer = await provider.getSigner();
            if (!signer) throw new Error('Signer is not initialized');
            
            const productsFromChain = await token.getProductsByAccount((await signer.getAddress()).toString());

            
            const parsedProducts: Product[] = productsFromChain.map((product: any) => ({
                id: product.id.toString(),
                name: product.name,
                manufacturer: product.manufacturer,
                // timestamp: new Date(product.timestamp.toNumber() * 1000).toLocaleString(),
                locations: product.locations,
                handlers: product.handlers,
            }));
                                    
            setProducts(parsedProducts);
        } catch (error) {
            console.error("Error fetching products by account:", error);
        }
    };

    const addNewProduct = async (name: string) => {
        try {
            if (!token) throw new Error('Token is not initialized');
            const tx = await token.createProduct(name);
            await tx.wait();
            fetchProductsByAccount();
        } catch (error) {
            console.error("Error adding new product:", error);
        }
    };

    const updateProduct = async (productId: string, location: string) => {
        try {
            if (!token) throw new Error('Token is not initialized');
            const tx = await token.updateProduct(productId, location);
            await tx.wait();
            fetchProductsByAccount();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        const init = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            _initialize();
        };

        init();
    }, []);

    useEffect(() => {
        if (token) {
            fetchProductsByAccount();
        }
    }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {isAddingProduct ? (
        <AddProduct
          onBack={() => setIsAddingProduct(false)}
          setNewProduct={addNewProduct}
        />
      ) : selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onUpdateLocation={updateProduct}
        />
      ) : (
        <ProductList
          products={products}
          onSelectProduct={setSelectedProduct}
          onAddProduct={() => setIsAddingProduct(true)}
        />
      )}
    </div>
  );
}

export default DApp;