import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing/Landing';
import AuthPage from './pages/Auth/Auth';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import FarmerOverview from './pages/Dashboard/Farmer/Overview';
import AddProduce from './pages/Dashboard/Farmer/AddProduce';
import FarmerListings from './pages/Dashboard/Farmer/Listings';
import FarmerOrders from './pages/Dashboard/Farmer/Orders';
import BuyerOrders from './pages/Dashboard/Buyer/Orders';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';
import Checkout from './pages/Checkout/Checkout';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <div className="min-h-screen flex flex-col w-full bg-background font-sans text-text-dark">
                  <Navbar />
                  
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      
                      <Route 
                        path="/checkout" 
                        element={<ProtectedRoute allowedRoles={['buyer', 'farmer', 'admin']}><Checkout /></ProtectedRoute>} 
                      />

                      {/* Dashboard Routes with ProtectedRoute */}
                      <Route 
                        path="/dashboard/farmer" 
                        element={<ProtectedRoute allowedRoles={['farmer']}><FarmerOverview /></ProtectedRoute>} 
                      />
                      <Route 
                        path="/dashboard/farmer/listings" 
                        element={<ProtectedRoute allowedRoles={['farmer']}><FarmerListings /></ProtectedRoute>} 
                      />
                      <Route 
                        path="/dashboard/farmer/add" 
                        element={<ProtectedRoute allowedRoles={['farmer']}><AddProduce /></ProtectedRoute>} 
                      />
                      <Route 
                        path="/dashboard/farmer/orders" 
                        element={<ProtectedRoute allowedRoles={['farmer']}><FarmerOrders /></ProtectedRoute>} 
                      />
                      <Route 
                        path="/dashboard/buyer" 
                        element={<ProtectedRoute allowedRoles={['buyer']}><BuyerOrders /></ProtectedRoute>} 
                      />
                      <Route 
                        path="/dashboard/admin" 
                        element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} 
                      />
                    </Routes>
                  </main>

                  <Footer />
                </div>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
