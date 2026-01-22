
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Search, PlusCircle, User, LogOut, LayoutDashboard, CreditCard, Settings, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 tracking-tight">AdVantage</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Browse</Link>
              <Link to="/categories" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Categories</Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden sm:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for anything..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                {profile?.role === 'seller' && (
                  <Link 
                    to="/post-ad" 
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Sell Now</span>
                  </Link>
                )}
                <div className="relative group">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <img 
                      src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username}&background=6366f1&color=fff`} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border border-slate-200"
                    />
                    <span className="hidden sm:inline text-sm font-medium text-slate-700">{profile?.username}</span>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase">Account</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      {profile?.role === 'seller' && (
                        <>
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50">
                            <LayoutDashboard className="w-4 h-4" /> Seller Dashboard
                          </Link>
                          <Link to="/subscription" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50">
                            <CreditCard className="w-4 h-4" /> Subscription
                          </Link>
                        </>
                      )}
                      <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <hr className="my-2 border-slate-100" />
                      <button 
                        onClick={() => { signOut(); navigate('/'); }}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium px-4 py-2 transition-colors">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100">Join</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
