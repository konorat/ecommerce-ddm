import "./App.css";
import Home from "./pages/home/Home";
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from "./pages/checkout/Checkout";
import { CookieProvider } from './context/CookieContext';

function App() {
  return (

    <CartProvider>
      <CookieProvider>
        <CategoryProvider>
          <ProductProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </BrowserRouter>
          </ProductProvider>
        </CategoryProvider>
      </CookieProvider>
    </CartProvider>
  );
}

export default App;
