import React, { useState } from 'react';
import { useCategories } from '../../../context/CategoryContext';
import { useCart } from '../../../context/CartContext';
import { Menu as MenuIcon, X } from 'lucide-react';
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Menu: React.FC = () => {
    const { categories } = useCategories();
    const [isOpen, setIsOpen] = useState(false);
    const { toggleCart } = useCart();

    const handleScroll = (id: number) => {
        const element = document.getElementById(`category-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false); // Fecha o menu ao clicar
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">

                {/* Logo ou nome */}
                <div className="text-2xl font-bold text-[#AA2B56]">Doce de Maria</div>

                {/* Carrinho */}
                <IconButton
                    sx={{
                        p: "10px",
                        color: "#AA2B56",
                        "&:hover": { color: "#4A7C82" },
                    }}
                    aria-label="carrinho de compras"
                    onClick={toggleCart}
                >
                    <ShoppingCartIcon fontSize="large" />
                </IconButton>

                {/* Botão hamburger para celular */}
                <button
                    className="md:hidden text-[#4A7C82]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </button>

                {/* Menu principal */}
                <ul
                    className={`
                        md:flex md:flex-row md:gap-6 md:items-center
                        flex flex-col gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 transition-all duration-300
                        ${isOpen ? 'block' : 'hidden'}
                    `}
                >
                    {categories.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleScroll(item.id)}
                                className="px-4 py-2 text-[#4A7C82] font-medium hover:text-[#AA2B56] transition-colors duration-200 w-full text-left md:text-center"
                            >
                                {item.nome}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
