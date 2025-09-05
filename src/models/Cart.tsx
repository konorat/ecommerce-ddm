import type { CartItem } from "../types/CartItem";

class Cart {
    items: Array<CartItem>;

    constructor() {
        this.items = [];
    }

    addItem(productId: number, quantity: number) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ productId, quantity });
        }
    }

    removeItem(productId: number) {
        this.items = this.items.filter(item => item.productId !== productId);
    }

    getItems() {
        return this.items;
    }
}

export default Cart;