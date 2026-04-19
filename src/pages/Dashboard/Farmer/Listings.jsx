import { motion } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { useProducts } from '../../../context/ProductContext';
import { useAuth } from '../../../context/AuthContext';
import ProductCard from '../../../components/shared/ProductCard';
import { Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export default function Listings() {
  const { products } = useProducts();
  const { user } = useAuth();

  // Filter products matching this farmer's name
  const myProducts = products.filter(p => p.farmer === user?.name);

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      <Sidebar role="farmer" />
      
      <main className="flex-grow lg:ml-64 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-dark">My Listings</h1>
              <p className="text-gray-500 mt-1">Manage your active produce listings on the marketplace.</p>
            </div>
            <Link to="/dashboard/farmer/add">
              <Button className="gap-2 w-full md:w-auto">
                <Plus size={18} /> Add New Produce
              </Button>
            </Link>
          </div>

          {myProducts.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {myProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-2">No listings yet</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't added any produce to the marketplace. Start listing your fresh harvest to reach thousands of buyers.
              </p>
              <Link to="/dashboard/farmer/add">
                <Button size="lg" className="gap-2">
                  <Plus size={18} /> Create First Listing
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
