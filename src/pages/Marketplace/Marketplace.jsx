import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, SlidersHorizontal, Leaf } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import ProductCard from '../../components/shared/ProductCard';
import { useProducts } from '../../context/ProductContext';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Leafy Greens', 'Spices'];

export default function Marketplace() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex justify-center">
      <div className="container mx-auto px-4 md:px-6 w-full max-w-7xl flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex gap-2">
          <Input 
            placeholder="Search produce or farmer..." 
            icon={Search} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="shrink-0 bg-white">
            <SlidersHorizontal size={20} />
          </Button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`md:w-64 shrink-0 transition-all ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-primary-dark border-b border-gray-100 pb-4">
              <Filter size={20} />
              <h3 className="font-heading font-bold text-lg">Filters</h3>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-text-dark mb-3 text-sm">Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-text-dark mb-3 text-sm">Price Range</h4>
              <input type="range" className="w-full accent-primary" min="0" max="1000" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹1000+</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark mb-3 text-sm">Location</h4>
              <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none focus:border-primary">
                <option>Any Location</option>
                <option>Maharashtra</option>
                <option>Punjab</option>
                <option>Gujarat</option>
                <option>Himachal Pradesh</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-grow flex flex-col gap-6">
          <div className="hidden md:flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-96 pl-2">
              <Input 
                placeholder="Search produce or farmer..." 
                icon={Search} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border-transparent focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-3 pr-2">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-semibold text-text-dark hover:text-primary transition-colors">
                Recommended <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-sm text-gray-500 font-medium px-1">
            Showing {filteredProducts.length} results {activeCategory !== 'All' && `for "${activeCategory}"`}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                <Leaf size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg">No products found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => {setActiveCategory('All'); setSearchQuery('');}}>
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
