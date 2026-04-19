import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { ShoppingBag, ChevronDown, MapPin, CheckCircle } from 'lucide-react';
import { useOrders } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';

export default function FarmerOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Filter orders that contain at least one item from this farmer
  const farmerOrders = orders.filter(order => 
    order.items.some(item => item.farmer === user?.name)
  ).map(order => {
    // Extract only the items belonging to this farmer
    const myItems = order.items.filter(item => item.farmer === user?.name);
    const myTotal = myItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return { ...order, myItems, myTotal };
  });

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      <Sidebar role="farmer" />
      
      <main className="flex-grow lg:ml-64 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-dark">Incoming Orders</h1>
            <p className="text-gray-500 mt-1">Manage and fulfill orders for your produce.</p>
          </div>

          <div className="flex flex-col gap-6">
            {farmerOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={40} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-text-dark mb-2">No orders received yet</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  When buyers purchase your produce, the orders will appear here.
                </p>
              </motion.div>
            ) : (
              farmerOrders.map((order) => (
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
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500">Ordered by <span className="font-semibold text-text-dark">{order.buyer}</span> on {order.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 flex-grow">
                        <div className="text-left md:text-right">
                          <p className="text-sm text-gray-500">Your Earnings</p>
                          <p className="font-bold text-lg text-green-600">₹{order.myTotal}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-700">
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
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-text-dark mb-4">Items to Fulfill</h4>
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                              <ul className="divide-y divide-gray-100">
                                {order.myItems.map((item, idx) => (
                                  <li key={idx} className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                      <div>
                                        <p className="font-medium text-text-dark">{item.name}</p>
                                        <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
                                      </div>
                                    </div>
                                    <span className="font-semibold text-text-dark">₹{item.price * item.qty}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-600">Total Payout</span>
                                <span className="font-bold text-green-600 text-xl">₹{order.myTotal}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-text-dark mb-4">Delivery Details</h4>
                            <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg mt-1">
                                  <MapPin size={18} />
                                </div>
                                <div>
                                  <p className="font-medium text-text-dark">Shipping Address</p>
                                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    {order.address}
                                  </p>
                                </div>
                              </div>
                              <div className="pt-4 border-t border-gray-100">
                                <Button className="w-full">Mark as Dispatched</Button>
                              </div>
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
