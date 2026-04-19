import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { LayoutDashboard, Package, PlusCircle, CreditCard, Settings, LogOut, ShoppingBag, Heart, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ role = 'farmer' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const farmerLinks = [
    { name: 'Overview', path: '/dashboard/farmer', icon: LayoutDashboard },
    { name: 'My Listings', path: '/dashboard/farmer/listings', icon: Package },
    { name: 'Add Produce', path: '/dashboard/farmer/add', icon: PlusCircle },
    { name: 'Orders', path: '/dashboard/farmer/orders', icon: ShoppingBag },
  ];

  const buyerLinks = [
    { name: 'My Orders', path: '/dashboard/buyer', icon: ShoppingBag },
    { name: 'Wishlist', path: '/dashboard/buyer/wishlist', icon: Heart },
    { name: 'Payments', path: '/dashboard/buyer/payments', icon: CreditCard },
    { name: 'Reviews', path: '/dashboard/buyer/reviews', icon: MessageSquare },
  ];

  const links = role === 'farmer' ? farmerLinks : buyerLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-100 flex flex-col pt-6 hidden lg:flex">
      <div className="px-6 mb-8">
        <h2 className="font-heading font-bold text-text-dark text-xl">
          {user ? `Welcome, ${user.name}` : 'Dashboard'}
        </h2>
        <p className="text-sm text-gray-500 capitalize">{role} Account</p>
      </div>

      <nav className="flex-grow px-4 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative',
                isActive 
                  ? 'text-primary font-semibold bg-primary/10' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-text-dark font-medium'
              )}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-500'} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto flex flex-col gap-2">
        <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-text-dark font-medium transition-all">
          <Settings size={20} className="text-gray-500" />
          <span>Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-all w-full text-left"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
