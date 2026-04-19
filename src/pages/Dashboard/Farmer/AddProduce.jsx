import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { Upload, Plus, X, Calendar, MapPin, IndianRupee, Package } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useProducts } from '../../../context/ProductContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/ui/Toast';

export default function AddProduce() {
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price || !quantity) {
      addToast({ title: 'Missing Fields', description: 'Please fill out all required fields.', variant: 'error' });
      return;
    }

    const newProduct = {
      name,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      farmer: user?.name || 'Unknown Farmer',
      price: parseFloat(price),
      unit,
      quantity: parseInt(quantity, 10),
      location: location || 'Not Specified',
      image: imagePreview || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800' // fallback image
    };

    addProduct(newProduct);
    
    addToast({ title: 'Success', description: 'Product listed successfully!', variant: 'success' });
    navigate('/dashboard/farmer/listings');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      <Sidebar role="farmer" />
      
      <main className="flex-grow lg:ml-64 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-dark">Add New Produce</h1>
            <p className="text-gray-500 mt-1">List your fresh harvest on the marketplace today.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <form className="p-6 md:p-10" onSubmit={handleSubmit}>
              
              {/* Image Upload Area */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-text-dark mb-3">Produce Photos</label>
                <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer group overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={24} />
                      </div>
                      <p className="font-medium text-text-dark mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-dark mb-2">Produce Name *</label>
                    <Input 
                      placeholder="e.g. Organic Vine Tomatoes" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-dark mb-2">Category *</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus-visible:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent cursor-pointer"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="leafy">Leafy Greens</option>
                      <option value="spices">Spices</option>
                    </select>
                  </div>
                </div>

                {/* Pricing & Quantity */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Price *</label>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        icon={IndianRupee} 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Unit</label>
                      <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus-visible:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent cursor-pointer"
                      >
                        <option value="kg">per kg</option>
                        <option value="ton">per ton</option>
                        <option value="dozen">per dozen</option>
                        <option value="bunch">per bunch</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-text-dark mb-2">Quantity Available *</label>
                      <Input 
                        type="number" 
                        placeholder="50" 
                        icon={Package} 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Harvest Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-8 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">Harvest Date</label>
                  <Input type="date" icon={Calendar} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">Farm Location</label>
                  <Input 
                    type="text" 
                    placeholder="e.g. Nashik, MH" 
                    icon={MapPin} 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-text-dark mb-2">Description & Farming Practices</label>
                <textarea 
                  rows="4" 
                  className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-text-dark focus-visible:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent resize-none"
                  placeholder="Describe your produce, variety, and any organic or sustainable farming practices used..."
                ></textarea>
              </div>

              {/* Submit Areas */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 p-6 bg-gray-50 -mx-6 md:-mx-10 -mb-6 md:-mb-10 mt-8 border-t border-gray-200">
                <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto bg-white">Save Draft</Button>
                <Button type="submit" size="lg" className="w-full sm:w-auto gap-2">
                  <Plus size={18} /> Publish Listing
                </Button>
              </div>

            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
