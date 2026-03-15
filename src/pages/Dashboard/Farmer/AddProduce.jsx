import { motion } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { Upload, Plus, X, Calendar, MapPin, IndianRupee, Package } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export default function AddProduce() {
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
            <form className="p-6 md:p-10" onSubmit={(e) => e.preventDefault()}>
              
              {/* Image Upload Area */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-text-dark mb-3">Produce Photos</label>
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="font-medium text-text-dark mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-dark mb-2">Produce Name</label>
                    <Input placeholder="e.g. Organic Vine Tomatoes" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-dark mb-2">Category</label>
                    <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus-visible:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent cursor-pointer">
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
                      <label className="block text-sm font-semibold text-text-dark mb-2">Price</label>
                      <Input type="number" placeholder="0.00" icon={IndianRupee} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Unit</label>
                      <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus-visible:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent cursor-pointer">
                        <option value="kg">per kg</option>
                        <option value="ton">per ton</option>
                        <option value="dozen">per dozen</option>
                        <option value="bunch">per bunch</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Quantity Available</label>
                      <Input type="number" placeholder="50" icon={Package} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Minimum Order</label>
                      <Input type="number" placeholder="5" />
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
                  <Input type="text" placeholder="e.g. Nashik, MH" icon={MapPin} />
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
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">Save Draft</Button>
                <Button size="lg" className="w-full sm:w-auto gap-2">
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
