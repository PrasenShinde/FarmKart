import { motion } from 'framer-motion';
import { Users, Store, DollarSign, Activity, AlertCircle, TrendingUp, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// Note: Reusing Farmer Sidebar component layout style for Admin but without actual dynamic switching for brevity of mockup
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, BookOpen } from 'lucide-react';

function AdminSidebar() {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/dashboard/admin', icon: Activity },
    { name: 'Farmers Mgmt', path: '/dashboard/admin/farmers', icon: Users },
    { name: 'Buyers Mgmt', path: '/dashboard/admin/buyers', icon: Store },
    { name: 'Transactions', path: '/dashboard/admin/transactions', icon: DollarSign },
    { name: 'Reports', path: '/dashboard/admin/reports', icon: BookOpen },
    { name: 'Disputes', path: '/dashboard/admin/disputes', icon: ShieldAlert },
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col pt-6 hidden lg:flex text-gray-300">
      <div className="px-6 mb-8">
        <h2 className="font-heading font-bold text-white text-xl">Admin Panel</h2>
        <p className="text-sm text-gray-500">Superuser Access</p>
      </div>
      <nav className="flex-grow px-4 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link key={link.path} to={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-800 hover:text-white'}`}>
              <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default function AdminDashboard() {
  const stats = [
    { title: "Total Platform Volume", value: "₹4.5Cr", trend: "+15.2%", color: "text-green-500" },
    { title: "Active Farmers", value: "4,209", trend: "+124", color: "text-blue-500" },
    { title: "Active Buyers", value: "1,150", trend: "+45", color: "text-purple-500" },
    { title: "Pending Disputes", value: "12", trend: "-3", color: "text-red-500", alert: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex pt-20">
      <AdminSidebar />
      
      <main className="flex-grow lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">System Overview</h1>
            <p className="text-gray-500 mt-1">Platform health and high-level metrics.</p>
          </div>
          <Button className="gap-2 shrink-0 bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/20">
            <Download size={18} />
            Export Monthly Report
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
            >
              {stat.alert && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
              <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wider">{stat.title}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <span className={`text-sm font-bold flex items-center mb-1 ${stat.alert ? 'text-red-500' : 'text-green-500'}`}>
                  {stat.alert ? <AlertCircle size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-heading font-bold text-gray-900 text-lg">Recent Transactions</h3>
              <button className="text-sm font-semibold text-primary">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200 bg-gray-50/50">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Farmer → Buyer</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: 'TXN-9021', parties: 'Ramesh P. → Taj Hotels', amount: '₹12,450', status: 'Completed', color: 'bg-green-100 text-green-800' },
                    { id: 'TXN-9022', parties: 'Anita D. → FreshMart', amount: '₹8,200', status: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
                    { id: 'TXN-9023', parties: 'Suresh K. → Local Retail', amount: '₹4,100', status: 'Failed', color: 'bg-red-100 text-red-800' },
                    { id: 'TXN-9024', parties: 'Ratnagiri Orchards → Apex Foods', amount: '₹45,000', status: 'Completed', color: 'bg-green-100 text-green-800' },
                    { id: 'TXN-9025', parties: 'Punjab Agrico → Grand Bazaar', amount: '₹1,20,000', status: 'Held', color: 'bg-gray-200 text-gray-800' },
                  ].map((tx, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{tx.id}</td>
                      <td className="px-6 py-4 text-gray-600">{tx.parties}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{tx.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${tx.color}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="font-heading font-bold text-gray-900 text-lg">System Alerts</h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3 items-start">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-red-800 text-sm">Logistics Delay (Mumbai)</h4>
                  <p className="text-xs text-red-600 mt-1">Heavy rains causing 24h delays in Mumbai region. 45 orders affected.</p>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3 items-start">
                <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-yellow-800 text-sm">High Verification Queue</h4>
                  <p className="text-xs text-yellow-700 mt-1">120 new farmer accounts pending KYC verification.</p>
                </div>
              </div>
              <Button variant="outline" className="mt-auto w-full border-gray-200 text-gray-600 hover:bg-gray-50">
                View All Alerts
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
