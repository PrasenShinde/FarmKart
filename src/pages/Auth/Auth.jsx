import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Mail, Lock, User, Tractor, Store, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { cn } from '../../utils/cn';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const initialRole = searchParams.get('role') || 'buyer';
  
  const [tab, setTab] = useState(initialTab);
  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    const pTab = searchParams.get('tab');
    if (pTab && (pTab === 'login' || pTab === 'signup')) setTab(pTab);
    const pRole = searchParams.get('role');
    if (pRole && (pRole === 'farmer' || pRole === 'buyer')) setRole(pRole);
  }, [searchParams]);

  const handleToggleTab = (newTab) => {
    setTab(newTab);
    navigate(`/auth?tab=${newTab}&role=${role}`, { replace: true });
  };

  const handleRoleSelect = (newRole) => {
    setRole(newRole);
    navigate(`/auth?tab=${tab}&role=${newRole}`, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto relative z-10 px-4"
      >
        <div className="glass p-8 rounded-3xl shadow-2xl border border-white/40">
          <div className="flex flex-col items-center mb-8 text-center">
            <Link to="/" className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
              <Leaf size={28} />
            </Link>
            <h2 className="text-3xl font-heading font-bold text-text-dark">
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mt-2">
              {tab === 'login' ? 'Enter your details to access your account' : 'Join the fastest growing agricultural marketplace'}
            </p>
          </div>

          {/* Role Selection (Only for Signup) */}
          <AnimatePresence mode="wait">
            {tab === 'signup' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <p className="text-sm font-semibold mb-3 text-text-dark">I want to join as a:</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleRoleSelect('farmer')}
                    className={cn(
                      'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all',
                      role === 'farmer' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 bg-white text-gray-500 hover:border-primary/30 hover:bg-gray-50'
                    )}
                  >
                    <Tractor size={28} />
                    <span className="font-semibold text-sm">Farmer</span>
                  </button>
                  <button
                    onClick={() => handleRoleSelect('buyer')}
                    className={cn(
                      'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all',
                      role === 'buyer' 
                        ? 'border-accent bg-accent/5 text-accent font-bold' 
                        : 'border-gray-200 bg-white text-gray-500 hover:border-accent/30 hover:bg-gray-50'
                    )}
                  >
                    <Store size={28} />
                    <span className="font-semibold text-sm">Buyer</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {tab === 'signup' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Input 
                  type="text" 
                  placeholder="Full Name" 
                  icon={User} 
                  required 
                />
              </motion.div>
            )}
            
            <Input 
              type="email" 
              placeholder="Email or Phone Number" 
              icon={Mail} 
              required 
            />
            
            <Input 
              type="password" 
              placeholder="Password" 
              icon={Lock} 
              required 
            />

            {tab === 'login' && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-primary hover:underline font-medium text-right">
                  Forgot Password?
                </a>
              </div>
            )}

            <Button fullWidth size="lg" className="mt-6 font-bold text-base gap-2 group">
              {tab === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
            {tab === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => handleToggleTab(tab === 'login' ? 'signup' : 'login')}
              className="text-primary font-bold hover:underline"
            >
              {tab === 'login' ? 'Sign up here' : 'Login here'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
