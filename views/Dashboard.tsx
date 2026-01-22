
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';
import { useAuthStore } from '../store';
import { 
  LayoutDashboard, 
  Package, 
  Eye, 
  MousePointer2, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  Settings, 
  Download, 
  Plus, 
  MoreVertical, 
  MapPin, 
  User as UserIcon,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'billing' | 'settings'>('overview');

  const stats = [
    { label: 'Total Ads', value: '12', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Views', value: '4.8k', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Ad Clicks', value: '842', icon: MousePointer2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'WhatsApp Leads', value: '126', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12.5%</span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Market Performance</h3>
              <p className="text-slate-500 text-sm mt-1">Growth of views and clicks over time</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-4 py-2 outline-none">
              <option>Weekly View</option>
              <option>Monthly View</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                  itemStyle={{ fontWeight: '800' }}
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Active Subscription</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30 uppercase">Premium</span>
              </div>
              <h3 className="text-3xl font-black mb-1">Gold Plan</h3>
              <p className="text-indigo-200 text-sm font-medium">Unlimited Power for your store</p>
              
              <div className="mt-10 pt-10 border-t border-white/10">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-indigo-300 uppercase tracking-widest">Next Billing</span>
                  <span>OCT 24, 2024</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-indigo-300 uppercase tracking-widest">Amount</span>
                  <span>Rs. 500.00</span>
                </div>
              </div>
              <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all">
                Manage Billing
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Notifications</h4>
            <div className="space-y-4">
              {[1, 2].map(n => (
                <div key={n} className="flex gap-4 items-start">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                     <Bell className="w-4 h-4 text-slate-400" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Your ad "iPhone 15" got 50 views today!</p>
                     <p className="text-xs text-slate-400 font-medium">2 hours ago</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900">Payment History & Invoices</h3>
          <button className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">Request Statement</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {[
                { id: 'INV-88291', date: 'Sept 24, 2024', amount: 'Rs. 500.00', status: 'Paid' },
                { id: 'INV-77102', date: 'Aug 24, 2024', amount: 'Rs. 500.00', status: 'Paid' },
                { id: 'INV-66504', date: 'July 24, 2024', amount: 'Rs. 500.00', status: 'Paid' },
              ].map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 text-slate-900 font-bold text-sm">{inv.id}</td>
                  <td className="px-6 py-5 text-slate-500 text-sm">{inv.date}</td>
                  <td className="px-6 py-5 text-slate-900 font-bold text-sm">{inv.amount}</td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">Completed</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Billing Address</h3>
          <form className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Company / Full Name</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Business Name Ltd." />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Street Address</label>
              <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="123 Main St, Floor 2"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">City</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Colombo" />
              </div>
              <div>
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">ZIP Code</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="00100" />
              </div>
            </div>
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl">Update Billing Profile</button>
          </form>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
           <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-indigo-100" />
              </div>
              <h3 className="text-xl font-bold mb-2">Active Payment Method</h3>
              <p className="text-indigo-200 text-sm font-medium">Automatic payments via PayPal ending in **42</p>
           </div>
           <div className="pt-8">
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all">Change Method</button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}&background=6366f1&color=fff`} 
              className="w-20 h-20 rounded-3xl border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-50 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seller Suite</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
              <UserIcon className="w-4 h-4" /> {profile?.username} • <MapPin className="w-4 h-4" /> Colombo, SL
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 hover:shadow-lg transition-all">
            <Settings className="w-4 h-4" /> Store Settings
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 hover:shadow-xl shadow-indigo-100 transition-all">
            <Plus className="w-5 h-5" /> Post New Ad
          </button>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex gap-2 p-2 bg-white border border-slate-200 rounded-3xl w-fit overflow-x-auto shadow-sm">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <LayoutDashboard className="w-4 h-4" /> Overview
        </button>
        <button 
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'ads' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <Package className="w-4 h-4" /> My Ads
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'billing' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <CreditCard className="w-4 h-4" /> Billing & Invoices
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'billing' && renderBilling()}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
           {/* Previous Manage My Ads Table logic here, wrapped in modern styling */}
           <div className="p-8 border-b border-slate-100 flex items-center justify-between">
             <h3 className="text-xl font-bold text-slate-900">Inventory Status</h3>
             <div className="flex gap-2">
                <input type="text" placeholder="Filter ads..." className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" />
             </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                 <tr>
                    <th className="px-8 py-5">Item</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">Stats</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {[1, 2, 3].map(item => (
                   <tr key={item} className="group hover:bg-slate-50/30 transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                           <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 group-hover:scale-110 transition-transform">
                              <img src={`https://picsum.photos/200/200?${item}`} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="font-black text-slate-900 text-sm">Professional Item {item}</p>
                              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Electronics • Colombo</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100 uppercase tracking-widest">Live</span>
                     </td>
                     <td className="px-8 py-6 text-sm font-black text-slate-900">Rs. 24,950</td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> 1.2k</span>
                           <span className="flex items-center gap-1.5"><MousePointer2 className="w-3 h-3" /> 82</span>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
