import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Category } from '../types/Category';
import { fetchCategories } from '../api/services/CategoryService';

interface CategoryContextProps {
    categories: Category[];
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category | null) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            const defaultCategory = categories.find(cat => cat.id === 1) || null;
            setSelectedCategory(defaultCategory);
        }
    }, [categories, selectedCategory]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const result = await fetchCategories();
                console.log('API result cateogry:', result);
                if (result.success) {
                    setCategories(result.data);
                }
            } catch (err) {
                console.error('Failed to load category:', err);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    return (
        <CategoryContext.Provider value={{ categories, selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};