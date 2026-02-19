import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);

  // Считаем общее количество товаров в корзине
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Логотип */}
        <Link to="/" className="text-xl font-bold tracking-tighter text-blue-600">
          SHOP_2026
        </Link>

        {/* Навигация */}
        <nav className="hidden sm:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Каталог</Link>
          <span className="text-gray-300">|</span>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition">Корзина</Link>
        </nav>

        {/* Иконка корзины с Badge */}
        <Link to="/cart" className="relative group p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-in fade-in zoom-in">
              {totalItems}
            </span>
          )}
        </Link>
        
      </div>
    </header>
  );
};

export default Header;