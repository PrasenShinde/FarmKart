import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Truck, ShieldCheck, ShoppingCart, Info, User, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Mocked fetch response
const product = {
  id: 1, 
  name: 'Organic Vine Tomatoes', 
  category: 'Vegetables',
  farmer: {
    name: 'Ramesh Patil',
    experience: '15 years',
    location: 'Nashik, Maharashtra',
    rating: 4.8,
    reviews: 124,
    avatar: 'https://images.unsplash.com/photo-1595842880196-8575971ab476?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Dedicated to sustainable and organic farming practices. Specializes in tomatoes, onions, and seasonal vegetables.'
  },
  price: 45, 
  unit: 'kg', 
  quantityAvailable: 50, 
  minOrder: 5,
  harvestDate: 'Oct 12, 2024',
  description: 'Freshly handpicked organic vine tomatoes. Grown without synthetic pesticides. High juiciness and rich red color, perfect for curries, salads, and sauces. Delivered within 24 hours of harvest.',
  images: [
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800'
  ]
};

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(product.minOrder);
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex justify-center">
      <div className="container mx-auto px-4 md:px-6 w-full max-w-6xl">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-8">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              layoutId={`image-${product.id}`}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-accent text-primary-dark px-3 py-1 rounded-lg text-sm font-bold shadow-md">
                Fresh Harvest
              </div>
            </motion.div>
            <div className="flex gap-4 overflow-x-auto hide-scroll-bar pb-2">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    mainImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-bold text-primary tracking-wider uppercase">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-text-dark mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star className="fill-yellow-500" size={18} />
                {product.farmer.rating} <span className="text-gray-400 font-normal ml-1">({product.farmer.reviews} reviews)</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <MapPin size={16} /> {product.farmer.location}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                <span className="text-lg text-gray-500 mb-1">/ {product.unit}</span>
              </div>
              <p className="text-sm text-gray-500">Available: <span className="font-semibold text-text-dark">{product.quantityAvailable} {product.unit}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                <ShieldCheck className="text-primary mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-sm">Direct from Farm</h4>
                  <p className="text-xs text-gray-500 mt-1">No middlemen involved</p>
                </div>
              </div>
              <div className="bg-accent/5 p-4 rounded-xl border border-accent/20 flex items-start gap-3">
                <Truck className="text-accent mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500 mt-1">Direct logistics route</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Buy */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-text-dark">Select Quantity</span>
                <span className="text-sm text-gray-500">Min. {product.minOrder} {product.unit}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                    className="px-4 py-2 text-xl hover:bg-gray-50 font-medium transition-colors"
                  >-</button>
                  <div className="w-16 flex items-center justify-center font-bold text-lg border-x border-gray-200">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(Math.min(product.quantityAvailable, quantity + 1))}
                    className="px-4 py-2 text-xl hover:bg-gray-50 font-medium transition-colors"
                  >+</button>
                </div>
                <div className="flex-grow text-right text-lg font-bold text-text-dark">
                  Total: <span className="text-primary">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-grow py-6 text-lg font-bold gap-2">
                  <ShoppingCart size={22} /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="py-6 px-6 bg-white border-2">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 min-h-[400px]">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 p-2 md:p-6 pb-4">
            {['description', 'farmer profile', 'reviews'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-6 py-3 rounded-xl font-bold text-sm capitalize transition-all ${
                  activeTab === t ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-8 pt-0">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
                  <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2"><Info size={20} className="text-primary"/> Product Information</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">{product.description}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 inline-block w-full max-w-sm">
                    <h4 className="font-bold mb-4 text-sm text-gray-400 uppercase tracking-wider">Harvest Details</h4>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Harvest Date</span>
                      <span className="font-bold text-text-dark">{product.harvestDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Quality Check</span>
                      <span className="font-bold text-green-600 flex items-center gap-1"><CheckCircle size={14}/> Passed</span>
                    </div>
                    <div className="flex justify-between items-center py-2 mt-2">
                      <span className="text-gray-600 font-medium">Residue Free</span>
                      <span className="font-bold text-text-dark">Yes (100%)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'farmer profile' && (
                <motion.div key="farmer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img src={product.farmer.avatar} alt={product.farmer.name} className="w-32 h-32 rounded-2xl object-cover shadow-sm bg-gray-100" />
                    <div>
                      <h3 className="text-2xl font-heading font-bold mb-1">{product.farmer.name}</h3>
                      <p className="text-primary font-medium mb-4 flex items-center gap-1.5"><MapPin size={16}/> {product.farmer.location}</p>
                      <p className="text-gray-600 max-w-2xl leading-relaxed text-lg mb-6">{product.farmer.bio}</p>
                      
                      <div className="flex gap-6">
                        <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-[120px]">
                          <span className="block text-2xl font-bold text-text-dark mb-1">{product.farmer.experience}</span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</span>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-[120px]">
                          <span className="block text-2xl font-bold text-text-dark mb-1">{product.farmer.rating} <span className="text-yellow-500 text-lg">★</span></span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{product.farmer.reviews} Reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <User size={48} className="text-gray-200 mb-4" />
                  <p className="text-lg">Reviews implementation in progress...</p>
                  <p className="text-sm mt-2">Check back later for verified buyer testimonies.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
