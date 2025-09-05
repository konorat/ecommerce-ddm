import React, { createContext, useContext, useState, type ReactNode } from 'react';
import Cart from '../models/Cart';
import type { CartItem } from '../types/CartItem';

type CartContextType = {
    cartItems: CartItem[];
    addItem: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addItem = (productId: number, quantity: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.productId === productId);
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity <= 0) {
                    // Remove se a quantidade ficar <= 0
                    return prev.filter(item => item.productId !== productId);
                }
                return prev.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                );
            }
            if (quantity > 0) {
                return [...prev, { productId, quantity }];
            }
            return prev;
        });
    };

    const removeItem = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, openCart, closeCart, toggleCart, isCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};