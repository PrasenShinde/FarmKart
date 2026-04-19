import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, CreditCard, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [address, setAddress] = useState('Taj Palace Hotel, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001');

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-background flex flex-col items-center justify-center">
        <ShoppingCart size={64} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-text-dark mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!user) {
      addToast({ title: 'Authentication Required', description: 'Please login to place an order.', variant: 'error' });
      navigate('/auth');
      return;
    }

    // Split items by farmer if needed, but for simplicity we place one big order
    // In a real app, you might create an order per farmer.
    const orderData = {
      buyer: user.name,
      total: cartTotal,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.cartQuantity,
        farmer: item.farmer,
        image: item.image
      })),
      address
    };

    placeOrder(orderData);
    clearCart();
    addToast({ title: 'Order Placed!', description: 'Your order has been successfully placed.', variant: 'success' });
    navigate('/dashboard/buyer');
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-heading font-bold text-text-dark mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-dark">Shipping Address</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">Full Address</label>
                  <textarea 
                    className="w-full rounded-xl border border-gray-200 p-4 text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none resize-none"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-dark">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-primary bg-primary/5 rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                    <span className="font-semibold text-text-dark">Cash on Delivery</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    <span className="font-semibold text-text-dark">UPI / Card (Coming Soon)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold text-text-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-text-dark text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">{item.farmer}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium">Qty: {item.cartQuantity}</span>
                        <span className="font-bold text-primary">₹{item.price * item.cartQuantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-text-dark pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal + 50}</span>
                </div>
              </div>

              <Button size="lg" fullWidth onClick={handlePlaceOrder} className="gap-2">
                Place Order <ChevronRight size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
