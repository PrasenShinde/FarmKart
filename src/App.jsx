import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing/Landing';
import AuthPage from './pages/Auth/Auth';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import FarmerOverview from './pages/Dashboard/Farmer/Overview';
import AddProduce from './pages/Dashboard/Farmer/AddProduce';
import BuyerOrders from './pages/Dashboard/Buyer/Orders';
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col w-full bg-background font-sans text-text-dark">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Dashboard Routes (Mocked Auth Guarding) */}
              <Route path="/dashboard/farmer" element={<FarmerOverview />} />
              <Route path="/dashboard/farmer/add" element={<AddProduce />} />
              <Route path="/dashboard/buyer" element={<BuyerOrders />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
