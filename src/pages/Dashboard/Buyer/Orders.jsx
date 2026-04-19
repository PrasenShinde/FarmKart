import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { Package, Truck, CheckCircle2, ChevronDown, Clock, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useOrders } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function BuyerDashboard() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { orders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter orders for the current buyer
  const buyerOrders = orders.filter(order => order.buyer === user?.name);

  const renderTracker = (progress) => {
    const steps = [
      { id: 0, label: 'Ordered', icon: Package },
      { id: 1, label: 'Accepted', icon: CheckCircle2 },
      { id: 2, label: 'In Transit', icon: Truck },
      { id: 3, label: 'Delivered', icon: MapPin },
    ];

    return (
      <div className="relative pt-6 pb-2">
        <div className="absolute top-10 left-[10%] right-[10%] h-1 bg-gray-200 rounded-full" />
        <div 
          className="absolute top-10 left-[10%] h-1 bg-primary rounded-full transition-all duration-1000" 
          style={{ width: `${(Math.min(progress, 3) / 3) * 80}%` }}
        />
        
        <div className="relative flex justify-between z-10 w-full px-[5%]">
          {steps.map((step) => {
            const isCompleted = progress >= step.id;
            const isCurrent = progress === step.id;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm mb-2 transition-colors duration-500
                  ${isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                  ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}
                `}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs font-semibold ${isCompleted ? 'text-primary-dark' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      <Sidebar role="buyer" />
      
      <main className="flex-grow lg:ml-64 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-dark">My Orders</h1>
            <p className="text-gray-500 mt-1">Track and manage your produce purchases.</p>
          </div>

          <div className="flex gap-4 mb-8 overflow-x-auto pb-2 hide-scroll-bar">
            {['All Orders', 'In Transit', 'Completed', 'Cancelled'].map((tab, i) => (
              <button 
                key={tab}
                className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {buyerOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-text-dark mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-6">You haven't placed any orders. Start browsing our fresh produce!</p>
                <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
              </div>
            ) : (
              buyerOrders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                          <Package size={24} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Clock size={14} /> Ordered on {order.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 flex-grow">
                        <div className="text-left md:text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-bold text-lg text-text-dark">₹{order.total}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            order.progress === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                          <ChevronDown 
                            className={`text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 bg-gray-50/30"
                      >
                        <div className="p-6">
                          <h4 className="font-semibold text-text-dark mb-4">Order Tracking</h4>
                          <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8 max-w-2xl mx-auto shadow-sm">
                            {renderTracker(order.progress)}
                            <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                              Expected Delivery: <span className="text-text-dark font-bold">{order.expectedDelivery}</span>
                            </p>
                          </div>

                          <h4 className="font-semibold text-text-dark mb-4">Items Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                              <ul className="divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                  <li key={idx} className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                                      <div>
                                        <p className="font-medium text-text-dark">{item.name}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.qty} | Farmer: {item.farmer}</p>
                                      </div>
                                    </div>
                                    <span className="font-semibold text-text-dark">₹{item.price * item.qty}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-600">Total (incl. delivery)</span>
                                <span className="font-bold text-primary text-xl">₹{order.total + 50}</span>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-xl border border-gray-100 p-5 h-fit flex flex-col gap-4">
                              <div>
                                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Shipping Address</h5>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {order.address}
                                </p>
                              </div>
                              <Button variant="outline" className="w-full mt-2">Download Invoice</Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
