import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../shared/CartDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    clearCart();
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/auth';
    if (user.role === 'farmer') return '/dashboard/farmer';
    if (user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/buyer';
  };

  const getHomeLink = () => {
    if (!user) return '/';
    if (user.role === 'farmer') return '/dashboard/farmer';
    if (user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/buyer';
  };

  const dynamicNavLinks = [
    { name: 'Home', path: getHomeLink() },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to={getHomeLink()} className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-primary text-white p-1.5 rounded-lg"
            >
              <Leaf size={24} />
            </motion.div>
            <span className="font-heading font-bold text-2xl tracking-tight text-primary-dark">
              FarmKart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {dynamicNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative transition-colors hover:text-primary',
                  location.pathname === link.path ? 'text-primary' : 'text-text-dark/80'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-text-dark/80 hover:text-primary transition-colors flex items-center relative mr-2"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={getDashboardLink()}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors font-medium"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full text-primary hover:bg-primary/5 transition-colors font-medium"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/auth?tab=signup" 
                  className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-text-dark/80 relative"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button 
              className="p-2 text-text-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/20 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-6 gap-4">
                {dynamicNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-lg font-medium p-2 rounded-lg',
                      location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-text-dark/80 hover:bg-gray-100'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex flex-col gap-3">
                  {user ? (
                    <>
                      <Link 
                        to={getDashboardLink()}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 bg-primary/10 text-primary rounded-xl text-center font-medium flex items-center justify-center gap-2"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full py-3 border border-red-200 text-red-500 rounded-xl text-center font-medium flex items-center justify-center gap-2"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/auth" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 border border-primary text-primary rounded-xl text-center font-medium"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/auth?tab=signup" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 bg-primary text-white rounded-xl text-center font-medium shadow-md shadow-primary/20"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
