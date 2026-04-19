import { motion } from 'framer-motion';
import { Sprout, ShoppingCart, Truck, HandCoins, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Farmers List Their Harvest',
      description: 'Local farmers harvest their fresh produce and list it directly on the FarmKart platform, setting their own prices without any middlemen.',
      icon: Sprout,
      color: 'bg-green-100 text-green-600',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Buyers Shop Fresh Produce',
      description: 'Consumers browse the marketplace, discovering a wide variety of fresh, organic, and locally-grown vegetables, fruits, and grains.',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Direct Order Placement',
      description: 'Buyers securely place their orders. The exact order details are instantly sent directly to the specific farmers who grew the produce.',
      icon: HandCoins,
      color: 'bg-amber-100 text-amber-600',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Farm-to-Door Delivery',
      description: 'Farmers pack the fresh orders, and our streamlined logistics network delivers the produce straight from the farm to the buyer\'s doorstep.',
      icon: Truck,
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-5xl text-center mb-20 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Sprout size={16} />
            <span>The FarmKart Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-dark mb-6 leading-tight">
            From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Soil</span> directly to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Table</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We are revolutionizing the agricultural supply chain by completely removing the middlemen. See how our platform connects hardworking farmers directly with conscious consumers.
          </p>
        </motion.div>
      </section>

      {/* The Steps Timeline */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-3xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl border-4 border-white"
                    />
                    
                    {/* Floating Step Number */}
                    <div className="absolute -top-6 -left-6 z-20 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center font-heading font-black text-3xl text-primary border-2 border-gray-50">
                      {step.id}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.color} shadow-sm`}>
                    <Icon size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3 pt-4">
                    {[1, 2, 3].map((_, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                        <CheckCircle2 size={20} className="text-primary" />
                        <span>{
                          index === 0 ? ['Set your own market price', 'Upload photos of your harvest', 'Instant marketplace visibility'][i] :
                          index === 1 ? ['100% farm-fresh guarantee', 'Support local agriculture', 'Transparent pricing'][i] :
                          index === 2 ? ['Secure payment processing', 'Instant farmer notification', 'Detailed order tracking'][i] :
                          ['Eco-friendly packaging', 'Optimized delivery routes', 'Freshness guaranteed'][i]
                        }</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 max-w-4xl mt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-3xl"></div>

          <h2 className="relative z-10 text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to join the revolution?
          </h2>
          <p className="relative z-10 text-primary-light text-lg mb-10 max-w-2xl mx-auto">
            Whether you're a farmer looking to maximize your profits or a consumer searching for the freshest organic produce, FarmKart is built for you.
          </p>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-50 shadow-lg"
              onClick={() => navigate('/auth?tab=signup')}
            >
              Get Started Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 hover:text-white group"
              onClick={() => navigate('/marketplace')}
            >
              Explore Marketplace <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
