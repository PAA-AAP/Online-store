import { useState, useContext } from 'react';
import productsData from '../data/products.json';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const { addToCart, cart } = useContext(CartContext);
  
  // Состояния для фильтров и сортировки
  const [sortBy, setSortBy] = useState('name-asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Логика фильтрации
  const filteredProducts = productsData.filter(product => {
    const min = minPrice ? product.price >= Number(minPrice) : true;
    const max = maxPrice ? product.price <= Number(maxPrice) : true;
    return min && max;
  });

  // Логика сортировки
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

      {/* Панель управления */}
      <div className="flex flex-wrap gap-4 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 ml-1">Сортировка</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-gray-200 border rounded-xl p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 ml-1">Цена от</label>
          <input 
            type="number" 
            placeholder="0" 
            className="border-gray-200 border rounded-xl p-2 w-28 outline-none focus:ring-2 focus:ring-blue-500"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 ml-1">Цена до</label>
          <input 
            type="number" 
            placeholder="99999" 
            className="border-gray-200 border rounded-xl p-2 w-28 outline-none focus:ring-2 focus:ring-blue-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedProducts.map(product => {
          const inCart = cart.find(item => item.id === product.id);
          
          return (
            <div key={product.id} className="group bg-white rounded-3xl p-4 border border-transparent hover:border-blue-100 hover:shadow-xl transition-all duration-300">
              <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </Link>
              
              <div className="flex justify-between items-start mb-2">
                <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">{product.name}</h3>
                </Link>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-bold ml-1 text-yellow-700">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-gray-900">{product.price.toLocaleString()} ₽</span>
                <button 
                  onClick={() => addToCart(product)}
                  className={`p-3 rounded-2xl transition-all ${
                    inCart 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200'
                  }`}
                >
                  {inCart ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;