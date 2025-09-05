import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../api/services/ProductService';
import { useCategories } from './CategoryContext';

interface ProductContextProps {
    products: Product[];
    filteredProducts: Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { selectedCategory } = useCategories();

    useEffect(() => {
        async function loadProducts() {
            try {
                const result = await fetchProducts();
                console.log('API result:', result);
                if (result.success) {
                    setProducts(result.data);
                }
            } catch (err) {
                console.error('Failed to load Product:', err);
            }
        }

        loadProducts();
    }, []); // <- array vazio, executa só uma vez

    useEffect(() => {
        console.log(products); // Agora mostra o valor atualizado
    }, [products]);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProducts(products.filter(
                (product) => product.idCategoria === selectedCategory.id
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [products, selectedCategory]);

    useEffect(() => {
        console.log(filteredProducts); // Agora mostra o valor atualizado
    }, [filteredProducts]);

    return (
        <ProductContext.Provider value={{ products, filteredProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};