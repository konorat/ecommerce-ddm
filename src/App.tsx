import "./App.css";
import Home from "./pages/home/Home";
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (


    <CartProvider>
      <CategoryProvider>
        <ProductProvider>
          <Home />
        </ProductProvider>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
