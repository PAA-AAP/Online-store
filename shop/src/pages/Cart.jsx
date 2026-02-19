import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Расчет итогов
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim() === '') return;
    
    if (promoCode === 'SAVE10') {
      setDiscount(0.1);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Неверный промокод');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ваша корзина пуста</h2>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.price} ₽</p>
              </div>
              
              <div className="flex items-center gap-3 border rounded-lg p-1">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 hover:bg-gray-100 rounded">-</button>
                <span className="w-5 text-center font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 hover:bg-gray-100 rounded">+</button>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-400 hover:text-red-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Итоговая панель */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4">Итого</h2>
          
          <div className="space-y-2 mb-6 text-gray-600">
            <div className="flex justify-between">
              <span>Сумма:</span>
              <span>{subtotal.toLocaleString()} ₽</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Скидка 10%:</span>
                <span>-{discountAmount.toLocaleString()} ₽</span>
              </div>
            )}
            <div className="flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
              <span>К оплате:</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Промокод"
                className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              />
              <button 
                onClick={handleApplyPromo}
                className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-black transition"
              >
                ОК
              </button>
            </div>
            {promoError && <p className="text-red-500 text-xs ml-1">{promoError}</p>}
            {discount > 0 && <p className="text-green-600 text-xs ml-1">Промокод применен!</p>}
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl mt-6 font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;