import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/Header.jsx';


import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';
import ProductPage from './pages/ProductPage.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;