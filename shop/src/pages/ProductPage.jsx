import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  
  // Находим нужный товар по ID из URL
  const product = productsData.find(p => p.id === Number(id));

  // Состояния для слайдера и аккордеона
  const [currentImg, setCurrentImg] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(false);

  if (!product) {
    return <div className="text-center py-20 text-xl">Товар не найден</div>;
  }

  const inCart = cart.find(item => item.id === product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/" className="text-blue-600 mb-6 inline-block hover:underline">← Назад в каталог</Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Блок галереи (Слайдер) */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 h-[500px]">
            <img 
              src={product.images[currentImg]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImg(index)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  currentImg === index ? 'border-blue-600 scale-105' : 'border-transparent'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Инфо-блок */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()} ₽</span>
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-bold text-yellow-700">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <button 
            onClick={() => addToCart(product)}
            className={`w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 mb-8 ${
              inCart 
              ? 'bg-green-500 text-white shadow-lg shadow-green-100' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100'
            }`}
          >
            {inCart ? 'Добавлено в корзину ✓' : 'Добавить в корзину'}
          </button>

          {/* Аккордеон */}
          <div className="border-t border-b border-gray-100">
            <button 
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="w-full py-6 flex justify-between items-center group"
            >
              <span className="text-lg font-bold text-gray-800">Расширенное описание</span>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isDescOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ${isDescOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
              <p className="text-gray-500 leading-relaxed italic">
                {product.extendedDescription}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;