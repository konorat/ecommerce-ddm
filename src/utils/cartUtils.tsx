import type { CartItem } from "../types/CartItem";

export const cartWithDetails = (cartItems: CartItem[], products: any[]) => {
    return cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, ...product };
    });
};