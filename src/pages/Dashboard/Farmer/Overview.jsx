import { motion } from 'framer-motion';
import Sidebar from '../../../components/layout/Sidebar';
import { Leaf, TrendingUp, Package, IndianRupee, ArrowUpRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Button } from '../../../components/ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function FarmerDashboard() {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Revenue (₹)',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Tomatoes', 'Onions', 'Potatoes', 'Wheat'],
    datasets: [
      {
        label: 'Quantity Sold (kg)',
        data: [500, 1200, 800, 2000],
        backgroundColor: '#FFB300',
        borderRadius: 8,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const statCards = [
    { title: "Total Revenue", value: "₹1,24,500", icon: <IndianRupee size={24} />, trend: "+12.5%", color: "text-primary", bg: "bg-primary/10" },
    { title: "Active Listings", value: "8", icon: <Package size={24} />, trend: "+2", color: "text-accent", bg: "bg-accent/10" },
    { title: "Total Orders", value: "156", icon: <TrendingUp size={24} />, trend: "+18.2%", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Produce Sold", value: "4.5 Tonnes", icon: <Leaf size={24} />, trend: "+8.4%", color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      <Sidebar role="farmer" />
      
      <main className="flex-grow lg:ml-64 p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-dark">Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, Ramesh! Here's what's happening today.</p>
          </div>
          <Button className="gap-2 shrink-0">
            <Package size={18} />
            Add New Produce
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-text-dark">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3 className="font-heading font-bold text-lg mb-6">Revenue Trend</h3>
            <div className="h-64">
              <Line data={lineChartData} options={lineOptions} />
            </div>
          </motion.div>

          {/* Top Selling Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3 className="font-heading font-bold text-lg mb-6">Top Selling Produce</h3>
            <div className="h-64">
              <Bar data={barChartData} options={lineOptions} />
            </div>
          </motion.div>
        </div>

        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-heading font-bold text-lg">Recent Orders</h3>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Produce</th>
                  <th className="p-4 font-semibold">Buyer</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: '#ORD-001', item: 'Organic Tomatoes', buyer: 'Taj Hotels, Mumbai', amount: '₹12,500', status: 'Delivered', color: 'bg-green-100 text-green-700' },
                  { id: '#ORD-002', item: 'Red Onions', buyer: 'FreshMart Retail', amount: '₹4,200', status: 'In Transit', color: 'bg-blue-100 text-blue-700' },
                  { id: '#ORD-003', item: 'Potatoes', buyer: 'Suresh Kirana', amount: '₹1,500', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-text-dark">{order.id}</td>
                    <td className="p-4 text-gray-600">{order.item}</td>
                    <td className="p-4 text-gray-600">{order.buyer}</td>
                    <td className="p-4 font-medium text-text-dark">{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${order.color}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
