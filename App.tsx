
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Mail, Github, Chrome, ArrowRight } from 'lucide-react';
import { supabase } from './supabase';
import { useAuthStore } from './store';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import AdDetails from './views/AdDetails';
import Subscription from './views/Subscription';
import Register from './views/Register';

const queryClient = new QueryClient();

// Global Error Interceptor to catch PayPal's host-access errors
if (typeof window !== 'undefined') {
  const originalError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msg = message ? message.toString().toLowerCase() : '';
    if (msg.includes('window host') || msg.includes('paypal') || msg.includes('bootstrap error')) {
      console.warn('Silenced PayPal environment error:', message);
      return true; // Prevent the error from bubbling up
    }
    if (originalError) {
      return originalError.apply(window, [message, source, lineno, colno, error]);
    }
    return false;
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || event.reason || '';
    if (typeof reason === 'string' && (reason.toLowerCase().includes('window host') || reason.toLowerCase().includes('paypal'))) {
      console.warn('Silenced PayPal promise rejection:', reason);
      event.preventDefault();
    }
  });
}

// Enhanced Mock Login
const Login: React.FC = () => {
  const { setUser, setProfile } = useAuthStore();
  const handleMockLogin = (role: 'buyer' | 'seller') => {
    setUser({ id: '123', email: 'test@example.com' });
    setProfile({
      id: '123',
      role,
      full_name: role === 'seller' ? 'Premium Store' : 'John Doe',
      username: role === 'seller' ? 'pro_seller' : 'johndoe',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
      avatar_url: `https://ui-avatars.com/api/?name=${role === 'seller' ? 'Store' : 'User'}&background=random`
    } as any);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 bg-slate-50/30">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl w-full max-w-md text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-100 rotate-3 hover:rotate-0 transition-transform">
          <span className="text-3xl font-black text-white">Ad</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500 mb-10">Choose your demo experience below</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleMockLogin('seller')}
            className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Chrome className="w-5 h-5" /> Sign in as Seller
          </button>
          <button 
            onClick={() => handleMockLogin('buyer')}
            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
          >
            <Github className="w-5 h-5" /> Sign in as Buyer
          </button>
        </div>
        
        <div className="mt-8 flex items-center gap-4 text-slate-400">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-xs font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <p className="mt-8 text-sm text-slate-600 font-medium">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'seller' | 'buyer' }> = ({ children, role }) => {
  const { user, profile, isLoading } = useAuthStore();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && profile?.role !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(false);
    };
    checkUser();
  }, [setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-1 bg-slate-50/50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ad/:id" element={<AdDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute role="seller">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={
                <ProtectedRoute role="seller">
                  <Subscription />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                <span className="text-3xl font-black text-white tracking-tighter">AdVantage</span>
                <p className="mt-4 text-sm leading-relaxed max-w-xs">
                  The most advanced mobile-first ads marketplace for modern businesses and smart buyers.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Platform</h4>
                <ul className="space-y-4 text-sm font-medium">
                  <li><Link to="/" className="hover:text-indigo-400 transition-colors">Find Products</Link></li>
                  <li><Link to="/categories" className="hover:text-indigo-400 transition-colors">Categories</Link></li>
                  <li><Link to="/subscription" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                  <li><Link to="/safety" className="hover:text-indigo-400 transition-colors">Safety Center</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Company</h4>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Newsletter</h4>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none pr-12" 
                  />
                  <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>&copy; 2024 AdVantage Marketplace. Crafted with excellence.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
