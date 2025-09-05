import React, { useState } from "react";
import Cart from "./Cart";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CakeIcon from "@mui/icons-material/Cake";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from "../../../context/CartContext";

const Header: React.FC = () => {
    const { toggleCart } = useCart();


    return (
        <header className="bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img
                        src="logo.png"
                        alt="Logo"
                        className="h-52 md:h-60 object-contain drop-shadow-lg"
                    />
                </div>

                {/* Busca */}
                <Paper
                    component="form"
                    sx={{
                        p: "4px 8px",
                        display: "flex",
                        alignItems: "center",
                        width: { xs: "100%", md: 400 },
                        borderRadius: 3,
                        boxShadow: 2,
                    }}
                    className="flex-grow max-w-md"
                >
                    <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <CakeIcon sx={{ color: "#AA2B56" }} />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="O que você procura?"
                        inputProps={{ "aria-label": "search" }}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon sx={{ color: "#AA2B56" }} />
                    </IconButton>
                </Paper>

                {/* Redes sociais e carrinho */}
                <div className="flex items-center gap-4">

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

                    {/* Instagram */}
                    <IconButton
                        sx={{
                            p: "10px",
                            color: "#AA2B56",
                            "&:hover": { color: "#4A7C82" },
                        }}
                        aria-label="Instagram"
                        href="https://www.instagram.com/docedemariajoinville/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        sx={{
                            p: "10px",
                            color: "#AA2B56",
                            "&:hover": { color: "#4A7C82" },
                        }}
                        aria-label="carrinho de compras"
                        onClick={() => window.open('https://wa.me/554730333909', '_blank')}
                    >
                        <WhatsAppIcon fontSize="large" />
                    </IconButton>


                </div>
            </div>

            {/* Informações da padaria */}
            <div className="container mx-auto text-center mt-4">
                <p className="text-sm md:text-base text-gray-600">
                    Rua Minas Gerais 2564, Joinville, SC
                </p>
                <p className="text-sm md:text-base text-gray-600">
                    Terça a Domingo 06:00 - 20:00 | (47) 3033-3909
                </p>
            </div>

            {/* Modal do carrinho */}
            <Cart
                aria-labelledby="modal-carrinho-title"
                aria-describedby="modal-carrinho-description"
            />
        </header>
    );
};

export default Header;
