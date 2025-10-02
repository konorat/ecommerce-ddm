import React, { useState } from 'react';
import { useProducts } from '../../../context/ProductContext';
import { useCategories } from '../../../context/CategoryContext';
import { useCart } from '../../../context/CartContext';

const Main: React.FC = () => {
    const { cartItems, addItem, removeItem, clearCart, isCartOpen, closeCart } = useCart();
    const { categories } = useCategories();
    const { products } = useProducts();

    const productsByCategory = categories.map(category => ({
        ...category,
        products: products.filter(product => product.idCategory === category.id)
    }));

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const increaseQuantity = (id: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    };

    const decreaseQuantity = (id: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    };

    return (
        <main className="bg-gray-50 py-12">
            <section className="container mx-auto px-4">
                {productsByCategory.map(category => (
                    <div key={category.id} id={`category-${category.id}`} className="mb-12">

                        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#AA2B56] pb-2 text-gray-800">
                            {category.name}
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {category.products.map(produto => {
                                const quantity = quantities[produto.id] || 1;

                                return (
                                    <div
                                        key={produto.id}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col"
                                    >
                                        <img
                                            src={produto.img}
                                            alt={produto.name}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <h4 className="text-xl font-semibold mt-4 text-gray-800">{produto.name}</h4>
                                        <p className="text-gray-600 mt-2 flex-grow">{produto.desc}</p>
                                        <p className="text-[#AA2B56] font-bold mt-2 text-lg">
                                            R$ {produto.price}
                                        </p>

                                        <div className="flex items-center mt-4 gap-2">
                                            <button
                                                onClick={() => decreaseQuantity(produto.id)}
                                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 border rounded">{quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(produto.id)}
                                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {Object.values(cartItems).some(item => item.productId === produto.id) ? (
                                            <button
                                                onClick={() => removeItem(produto.id)}
                                                className="mt-4 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                                            >
                                                Remover do Carrinho
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addItem(produto.id, quantity)}
                                                className="mt-4 bg-[#AA2B56] text-white font-semibold py-2 rounded-lg hover:bg-[#4A7C82] transition-colors duration-200"
                                            >
                                                Adicionar ao Carrinho
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Main;
