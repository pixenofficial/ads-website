
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setProfile } = useAuthStore();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    country: 'Sri Lanka',
    address: '',
    contactNumber: '',
    whatsappNumber: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call Supabase Auth
    setUser({ id: '123', email: formData.email });
    setProfile({
      id: '123',
      role: role as any,
      full_name: formData.fullName,
      username: formData.username,
      email: formData.email,
      created_at: new Date().toISOString(),
      ...(role === 'seller' ? {
        country: formData.country,
        address: formData.address,
        contact_number: formData.contactNumber,
        whatsapp_number: formData.whatsappNumber,
        subscription_type: null,
        subscription_expiry: null
      } : {})
    } as any);
    
    navigate(role === 'seller' ? '/subscription' : '/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-20 bg-slate-50/50">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="col-span-full text-center mb-8">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Join AdVantage</h1>
                <p className="text-slate-500 text-lg">Choose how you want to use the platform to get started.</p>
              </div>

              <button 
                onClick={() => { setRole('buyer'); setStep(2); }}
                className="group p-8 bg-white border-2 border-slate-200 rounded-3xl text-left hover:border-indigo-600 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">I want to Buy</h3>
                <p className="text-slate-500 mb-6">Browse thousands of ads, contact sellers directly, and save your favorites.</p>
                <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                  Continue as Buyer <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </button>

              <button 
                onClick={() => { setRole('seller'); setStep(2); }}
                className="group p-8 bg-white border-2 border-slate-200 rounded-3xl text-left hover:border-indigo-600 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">I want to Sell</h3>
                <p className="text-slate-500 mb-6">Create professional ads, track performance, and grow your business today.</p>
                <div className="flex items-center text-green-600 font-bold group-hover:translate-x-2 transition-transform">
                  Continue as Seller <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-2 bg-indigo-600 p-12 text-white flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Complete your {role} profile</h2>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-indigo-200 mt-1" />
                        <p className="text-indigo-50 text-sm">Access to premium local marketplace</p>
                      </li>
                      <li className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-indigo-200 mt-1" />
                        <p className="text-indigo-50 text-sm">Secure transactions and verified profiles</p>
                      </li>
                      {role === 'seller' && (
                        <li className="flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-indigo-200 mt-1" />
                          <p className="text-indigo-50 text-sm">Professional dashboard & analytics</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="pt-12">
                    <button onClick={() => setStep(1)} className="text-sm font-medium text-indigo-200 hover:text-white flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Change account type
                    </button>
                  </div>
                </div>

                <div className="col-span-3 p-12">
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Username</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="johndoe123"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Password</label>
                      <input 
                        required
                        type="password" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>

                    {role === 'seller' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-6 pt-6 border-t border-slate-100"
                      >
                         <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Contact Number</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="+94 77..."
                              value={formData.contactNumber}
                              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">WhatsApp Number</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="+94 77..."
                              value={formData.whatsappNumber}
                              onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Business Address</label>
                          <textarea 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                            rows={2}
                            placeholder="Enter your full business address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          ></textarea>
                        </div>
                      </motion.div>
                    )}

                    <button 
                      type="submit" 
                      className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                    >
                      {role === 'seller' ? 'Next: Choose Package' : 'Complete Registration'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
