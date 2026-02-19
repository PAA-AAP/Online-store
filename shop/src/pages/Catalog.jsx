import { useState, useContext } from 'react';
import productsData from '../data/products.json';
import { CartContext } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const { addToCart, cart } = useContext(CartContext);
  
  // Состояния для фильтров и сортировки
  const [sortBy, setSortBy] = useState('name-asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);

  // 1. Логика фильтрации (Цена + Рейтинг)
  const filteredProducts = productsData.filter(product => {
    const matchesPriceMin = minPrice ? product.price >= Number(minPrice) : true;
    const matchesPriceMax = maxPrice ? product.price <= Number(maxPrice) : true;
    const matchesRating = product.rating >= Number(minRating);

    return matchesPriceMin && matchesPriceMax && matchesRating;
  });

  // 2. Логика сортировки
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Каталог товаров</h1>

      {/* Панель фильтров и сортировки */}
      <div className="flex flex-wrap items-end gap-6 mb-10 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
        
        {/* Сортировка */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Сортировать</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-gray-200 border rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-gray-700"
          >
            <option value="name-asc">По алфавиту (А-Я)</option>
            <option value="name-desc">По алфавиту (Я-А)</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </div>

        {/* Цена ОТ */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Цена от</label>
          <input 
            type="number" 
            placeholder="0" 
            className="border-gray-200 border rounded-xl p-2.5 w-32 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Цена ДО */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Цена до</label>
          <input 
            type="number" 
            placeholder="999 000" 
            className="border-gray-200 border rounded-xl p-2.5 w-32 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Рейтинг ОТ */}
      <div className="flex flex-col gap-1.5">
       <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Рейтинг от</label>
       <div className="relative">
          <input 
            type="number" 
           step="0.1" // Позволяет вводить дробные числа (например, 4.2)
           min="0"
           max="5"
            placeholder="0.0" 
           className="border-gray-200 border rounded-xl p-2.5 w-28 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-8"
            value={minRating === 0 ? '' : minRating}
           onChange={(e) => {
              const val = e.target.value;
             // Ограничиваем ввод диапазоном 0-5
             if (val === '' || (Number(val) >= 0 && Number(val) <= 5)) {
                setMinRating(val === '' ? 0 : val);
              }
           }}
         />
         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 text-sm">★</span>
       </div>
      </div>

        {/* Кнопка сброса */}
        {(minPrice || maxPrice || minRating > 0) && (
          <button 
            onClick={() => { setMinPrice(''); setMaxPrice(''); setMinRating(0); }}
            className="mb-1 text-sm text-red-500 hover:text-red-700 font-medium transition"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Сетка товаров или сообщение об отсутствии */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-400">Ничего не найдено по вашим параметрам 🔍</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map(product => {
            const inCart = cart.find(item => item.id === product.id);
            
            return (
              <div key={product.id} className="group bg-white rounded-3xl p-4 border border-transparent hover:border-blue-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                {/* Изображение */}
                <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl mb-4 relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs font-bold ml-1 text-gray-800">{product.rating}</span>
                  </div>
                </Link>
                
                {/* Название и описание */}
                <div className="mb-4 flex-1">
                  <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition">
                    <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                </div>
                
                {/* Цена и Кнопка */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-gray-900">{product.price.toLocaleString()} ₽</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className={`p-3 rounded-2xl transition-all duration-300 ${
                      inCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95'
                    }`}
                  >
                    {inCart ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Catalog;