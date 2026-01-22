
import React from 'react';
import { CATEGORIES } from '../constants';
import AdCard from '../components/AdCard';
import { Ad } from '../types';

// Fixed property missing errors by adding 'description' to MOCK_ADS
const MOCK_ADS: Ad[] = [
  { id: '1', seller_id: 's1', title: 'iPhone 15 Pro Max 256GB Titanium', description: 'Original brand new sealed pack. Global version.', price: 145000, category: 'Electronics', location: 'Colombo, SL', images: ['https://picsum.photos/400/300?1'], created_at: '', status: 'active', views: 120, clicks: 45 },
  { id: '2', seller_id: 's2', title: 'Toyota Aqua G Grade 2017', description: 'Excellent condition, low mileage, full service history.', price: 8250000, category: 'Vehicles', location: 'Kandy, SL', images: ['https://picsum.photos/400/300?2'], created_at: '', status: 'active', views: 800, clicks: 120 },
  { id: '3', seller_id: 's3', title: 'Luxury 3BR Apartment in Colombo 7', description: 'Spacious 3 bedroom apartment with city views and pool access.', price: 45000000, category: 'Real Estate', location: 'Colombo 7, SL', images: ['https://picsum.photos/400/300?3'], created_at: '', status: 'active', views: 540, clicks: 30 },
  { id: '4', seller_id: 's4', title: 'Canon EOS R6 Mirrorless Camera', description: 'Professional full-frame mirrorless camera in mint condition.', price: 385000, category: 'Electronics', location: 'Negombo, SL', images: ['https://picsum.photos/400/300?4'], created_at: '', status: 'active', views: 95, clicks: 12 },
  { id: '5', seller_id: 's5', title: 'Office Chair - Ergonomic Design', description: 'High-quality ergonomic chair for long working hours.', price: 25000, category: 'Home & Garden', location: 'Galle, SL', images: ['https://picsum.photos/400/300?5'], created_at: '', status: 'active', views: 230, clicks: 55 },
  { id: '6', seller_id: 's6', title: 'MacBook Pro M2 14-inch', description: 'Latest M2 chip, 16GB RAM, 512GB SSD. Perfect for developers.', price: 520000, category: 'Electronics', location: 'Battaramulla, SL', images: ['https://picsum.photos/400/300?6'], created_at: '', status: 'active', views: 150, clicks: 40 },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Buy and Sell <br /><span className="text-indigo-200">Everything</span> in Seconds.
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-2xl font-medium">
            Join the most advanced marketplace in the region. Verified sellers, secure transactions, and thousands of daily listings.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg">Start Browsing</button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all">List an Ad</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-slate-500 mt-2">Find exactly what you need from our curated categories</p>
          </div>
          <button className="text-indigo-600 font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="group bg-white p-6 rounded-2xl border border-slate-200 text-center hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer">
              <span className="text-3xl group-hover:scale-110 transition-transform inline-block mb-3">{cat.icon}</span>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Fresh Recommendations</h2>
            <p className="text-slate-500 mt-2">Based on what's trending right now</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_ADS.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl">
            Explore 1,500+ More Ads
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
