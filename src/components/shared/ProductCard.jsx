import { motion } from 'framer-motion';
import { Star, MapPin, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../ui/Toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { deleteProduct } = useProducts();
  const { user } = useAuth();
  const { addToast } = useToast();

  const isOwner = user && user.name === product?.farmer;

  if (!product) return null;

  const handleDelete = () => {
    deleteProduct(product.id);
    addToast({ title: 'Listing Deleted', description: `${product.name} has been removed.`, variant: 'success' });
  };

  const handleBuy = () => {
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary flex items-center gap-1 shadow-sm">
          <Star size={12} className="fill-primary" />
          {product.rating || 'New'}
        </div>
        <div className="absolute top-3 right-3 bg-accent text-primary-dark px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          Fresh
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-lg text-text-dark line-clamp-1">
            {product.name}
          </h3>
          <div className="text-right whitespace-nowrap ml-2">
            <span className="font-bold text-lg text-primary">₹{product.price}</span>
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4 flex-grow space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
              {product.farmer.charAt(0)}
            </span>
            <span className="font-medium text-text-dark">{product.farmer}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={14} />
            <span className="truncate">{product.location}</span>
          </div>
          
          <div className="text-sm bg-gray-50 inline-block px-2 py-1 rounded-md mt-1 border border-gray-100">
            Available: <span className="font-semibold text-text-dark">{product.quantity} {product.unit}</span>
          </div>
        </div>

        {/* Action */}
        {isOwner ? (
          <Button fullWidth variant="outline" className="gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300" onClick={handleDelete}>
            <Trash2 size={18} />
            Delete Listing
          </Button>
        ) : (
          <Button fullWidth className="gap-2 group-hover:bg-primary-dark transition-colors" onClick={handleBuy}>
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        )}
      </div>
    </motion.div>
  );
}
