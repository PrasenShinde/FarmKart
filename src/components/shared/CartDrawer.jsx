import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-dark font-heading">Your Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag size={48} className="text-gray-300 mb-4" />
                  <p className="font-medium text-lg text-text-dark">Your cart is empty</p>
                  <p className="text-sm mt-1">Add some fresh produce to get started.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6" 
                    onClick={() => { onClose(); navigate('/marketplace'); }}
                  >
                    Browse Marketplace
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-gray-100" 
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold text-text-dark text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{item.farmer}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          <span className="text-sm font-medium px-2 py-1 bg-gray-50 rounded-md">
                            Qty: {item.cartQuantity}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-text-dark">₹{cartTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                <Button fullWidth size="lg" className="gap-2" onClick={handleCheckout}>
                  Proceed to Checkout <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
