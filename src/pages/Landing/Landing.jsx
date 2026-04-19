import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, TrendingUp, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const tickerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    // GSAP Hero Animation
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    }

    // GSAP Ticker animation
    if (tickerRef.current) {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, []);

  const features = [
    { icon: <ShieldCheck size={32} />, title: "No Middlemen", desc: "Buy directly from growers, ensuring transparency and better prices." },
    { icon: <TrendingUp size={32} />, title: "Fair Pricing", desc: "Farmers get exactly what they ask for, leading to better lives." },
    { icon: <Leaf size={32} />, title: "Fresh Produce", desc: "Farm to table in record time, guaranteeing peak freshness." },
    { icon: <Truck size={32} />, title: "Fast Logistics", desc: "Optimized delivery networks to get your food fast." },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
          <div ref={heroTextRef} className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6 border border-primary/20 backdrop-blur-sm">
              <Leaf size={16} /> 100% Organic & Direct
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-text-dark leading-tight tracking-tight mb-6 text-balance">
              Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Farms</span> Directly to Markets
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl text-balance">
              Eliminate middlemen. Ensure fair pricing for farmers and freshest produce for buyers with our transparent agritech platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/auth?tab=signup&role=farmer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg shadow-xl shadow-primary/30 group">
                  Start Selling
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-lg bg-white/50 backdrop-blur-sm">
                  Explore Market
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 md:left-1/4 w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-10 hidden md:flex"
        >
          <span className="text-3xl">🍅</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 md:right-1/4 w-20 h-20 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center z-10 hidden md:flex"
        >
          <span className="text-4xl">🥦</span>
        </motion.div>
      </section>

      {/* Live Marketplace Ticker */}
      <div className="w-full bg-primary-dark text-white py-3 overflow-hidden flex whitespace-nowrap border-y border-white/10">
        <div ref={tickerRef} className="flex gap-8 px-4 font-medium text-sm w-fit">
          {/* Duplicate content to make seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> 500kg Tomatoes sold in Nashik</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> 200kg Onions reached Mumbai</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> Ramesh P. joined from Pune</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> 1000kg Wheat pre-ordered</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> New logistics partner in Nagpur</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Features Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Why choose FarmKart?</h2>
            <p className="text-gray-600 text-lg">We are revolutionizing the agricultural supply chain by empowering those who feed the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 bg-background rounded-2xl border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feat.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">How it works</h2>
            <p className="text-gray-600 text-lg">A simple, transparent process for everyone.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -mt-2 -mb-2 md:-translate-x-1/2 rounded-full hidden sm:block">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-primary origin-top"
              />
            </div>

            {[
              { title: "Farmer Lists Produce", desc: "Farmers create an account, manage their inventory, and list their harvest with expected quantity and price. They set their own fair prices without middlemen.", align: "right" },
              { title: "Buyer Places Order", desc: "Restaurants, retailers, or consumers browse the live marketplace, compare listings, and buy directly from verified growers.", align: "left" },
              { title: "Delivery & Fulfillment", desc: "Once an order is confirmed, our logistics partners pick up the fresh produce from the farm and deliver it rapidly to the buyer.", align: "right" },
              { title: "Platform Administration", desc: "Administrators monitor the entire ecosystem, verify users, handle disputes, and maintain platform integrity.", align: "left", button: { text: "Admin Dashboard", link: "/dashboard/admin" } }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: step.align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col sm:flex-row items-center justify-between mb-12 last:mb-0 ${step.align === 'left' ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Number Circle */}
                <div className="absolute left-0 sm:left-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 w-12 h-12 bg-primary text-white font-bold rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-background z-10 shrink-0">
                  {i + 1}
                </div>
                
                {/* Content */}
                <div className={`w-full sm:w-[45%] pl-16 sm:pl-0 ${step.align === 'left' ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold font-heading mb-3">{step.title}</h3>
                    <p className={`text-gray-600 leading-relaxed ${step.button ? 'mb-4' : ''}`}>{step.desc}</p>
                    {step.button && (
                      <Link to={step.button.link}>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                          {step.button.text}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Marketplace Preview */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Fresh from the Farm</h2>
              <p className="text-gray-600 text-lg max-w-xl">Browse live listings currently available on the marketplace.</p>
            </div>
            <Link to="/marketplace" className="mt-6 md:mt-0 text-primary font-bold hover:text-primary-dark flex items-center gap-2 group">
              View all produce <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard product={{
              id: 1, name: 'Organic Tomatoes', farmer: 'Ramesh Patil', price: 45, unit: 'kg', quantity: 50, location: 'Nashik, MH', rating: 4.8, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800'
            }} />
            <ProductCard product={{
              id: 2, name: 'Fresh Potatoes', farmer: 'Suresh Kumar', price: 30, unit: 'kg', quantity: 200, location: 'Pune, MH', rating: 4.5, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800'
            }} />
            <ProductCard product={{
              id: 3, name: 'Premium Apples', farmer: 'Himachal Orchards', price: 120, unit: 'kg', quantity: 40, location: 'Shimla, HP', rating: 4.9, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?auto=format&fit=crop&q=80&w=800'
            }} />
            <ProductCard product={{
              id: 4, name: 'Green Cabbage', farmer: 'Anita Devi', price: 25, unit: 'kg', quantity: 80, location: 'Surat, GJ', rating: 4.6, image: 'https://images.unsplash.com/photo-1533529323315-998e3bbf49a9?auto=format&fit=crop&q=80&w=800'
            }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Farmer Success Stories</h2>
            <p className="text-gray-600 text-lg">Hear from the people who grow our food.</p>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
            {[
              { name: "Ramesh Patil", role: "Tomato Farmer, Nashik", quote: "FarmKart eliminated the 40% commission I used to pay to middlemen. My income has doubled this year.", img: "https://images.unsplash.com/photo-1595842880196-8575971ab476?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Anita Devi", role: "Organic Grower, Pune", quote: "The direct connection with restaurants means I can sell my premium organic produce at the price it deserves.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "Suresh Kumar", role: "Wheat Farmer, Punjab", quote: "Fast payments and transparent logistics. I don't have to worry about transporting my harvest anymore.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" }
            ].map((testimonial, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center glass bg-white p-8 rounded-2xl flex-shrink-0 border border-gray-100 shadow-sm">
                <div className="flex text-accent mb-4">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-text-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary-dark/90 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Farm"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-dark p-12 rounded-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Start selling your harvest today.
            </h2>
            <p className="text-white/80 text-xl mb-10">
              Join thousands of farmers who are maximizing their profits by skipping the middleman.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth?tab=signup&role=farmer">
                <Button size="lg" className="w-full bg-accent text-primary-dark hover:bg-yellow-400 border-none font-bold text-lg px-8">
                  Register as Farmer
                </Button>
              </Link>
              <Link to="/auth?tab=signup&role=buyer">
                <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 font-bold text-lg px-8">
                  Register as Buyer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
