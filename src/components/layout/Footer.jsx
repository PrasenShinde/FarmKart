import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Intro */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Leaf size={24} className="text-accent" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">
                FarmKart
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mt-2 max-w-xs">
              Connecting farmers directly with buyers. We eliminate middlemen to ensure fair pricing for farmers and fresh produce for everyone.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 hover:border-transparent">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 hover:border-transparent">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 hover:border-transparent">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-white/70 text-sm">
              <li><Link to="/marketplace" className="hover:text-accent transition-colors">Marketplace</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent transition-colors">How it Works</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/auth" className="hover:text-accent transition-colors">Farmer Login</Link></li>
              <li><Link to="/auth" className="hover:text-accent transition-colors">Buyer Login</Link></li>
            </ul>
          </div>

          {/* Contact Array */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>123 Agri-Tech Park, Layout Layout, Nashik, India 422003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>support@farmkart.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to get updates on seasonal crops, new farmers, and special offers.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent text-white placeholder:text-white/30 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-accent text-primary-dark font-medium rounded-xl px-4 py-3 hover:bg-yellow-400 transition-colors shadow-lg shadow-accent/20"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} FarmKart. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
