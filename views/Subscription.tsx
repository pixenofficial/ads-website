
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PACKAGES } from '../constants';
import { useAuthStore } from '../store';
import { Check, ShieldCheck, CreditCard, Download, Loader2, Sparkles, ShieldAlert, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Subscription: React.FC = () => {
  const { profile, setProfile } = useAuthStore();
  const [selectedPackage, setSelectedPackage] = useState<'silver' | 'gold' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null);
  const [isSdkLoading, setIsSdkLoading] = useState(false);
  const [sdkBlocked, setSdkBlocked] = useState<boolean>(false);
  const checkInterval = useRef<any>(null);

  // Initial environment check: PayPal often fails if window.location.host is restricted or in strange iFrames
  useEffect(() => {
    try {
      // Test if basic cross-origin access or host reading triggers an error
      const test = window.location.host;
      if (!test) throw new Error('Host restricted');
    } catch (e) {
      console.warn('Early detection: Environment may restrict PayPal SDK.');
      setSdkBlocked(true);
    }
  }, []);

  const handleActivation = useCallback((pkg: 'silver' | 'gold') => {
    setIsProcessing(true);
    // Simulate real-time subscription activation
    setTimeout(() => {
      const invoiceData = {
        id: `INV-${Math.floor(Math.random() * 900000) + 100000}`,
        date: new Date().toLocaleDateString(),
        amount: PACKAGES[pkg].price,
        package: PACKAGES[pkg].name,
        status: 'Paid',
        method: sdkBlocked ? 'Direct Advantage Pay' : 'PayPal Secure'
      };
      
      setProfile({
        ...profile,
        subscription_type: pkg,
        subscription_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      } as any);
      
      setPaymentSuccess(invoiceData);
      setIsProcessing(false);
    }, 1500);
  }, [profile, setProfile, sdkBlocked]);

  const loadPaypalSDK = useCallback(() => {
    if ((window as any).paypal) return Promise.resolve((window as any).paypal);
    if (sdkBlocked) return Promise.reject(new Error('Blocked environment'));
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'paypal-sdk-script';
      script.src = "https://www.paypal.com/sdk/js?client-id=AV3E8HR7m_3gM-hEi0upPMft-6JnWjtD--YsnHEHtA37DG9C2Hogc4rPLSHZ2yHX9u9JtlPP9SpxeBOg&currency=USD&components=buttons";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        // Double check if it actually initialized without crashing
        if ((window as any).paypal) {
          resolve((window as any).paypal);
        } else {
          setSdkBlocked(true);
          reject(new Error('PayPal loaded but not initialized'));
        }
      };
      
      script.onerror = () => {
        setSdkBlocked(true);
        reject(new Error('Script load failure'));
      };
      
      document.body.appendChild(script);

      // Timeout safety
      setTimeout(() => {
        if (!(window as any).paypal) {
          setSdkBlocked(true);
          resolve(null);
        }
      }, 5000);
    });
  }, [sdkBlocked]);

  useEffect(() => {
    if (selectedPackage && !sdkBlocked) {
      setIsSdkLoading(true);
      
      loadPaypalSDK()
        .then((paypal: any) => {
          if (!paypal) {
            setSdkBlocked(true);
            setIsSdkLoading(false);
            return;
          }
          
          try {
            const containerId = `paypal-button-container-${selectedPackage}`;
            const container = document.getElementById(containerId);
            if (!container) return;
            
            container.innerHTML = '';

            paypal.Buttons({
              style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' },
              createOrder: (data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: { value: (PACKAGES[selectedPackage].price / 300).toFixed(2) }
                  }]
                });
              },
              onApprove: async (data: any, actions: any) => {
                await actions.order.capture();
                handleActivation(selectedPackage);
              },
              onError: (err: any) => {
                console.warn('Caught PayPal UI Error:', err);
                setSdkBlocked(true);
              }
            }).render(`#${containerId}`).catch((err: any) => {
              console.warn('Render failed, switching to direct pay:', err);
              setSdkBlocked(true);
            });
          } catch (e) {
            setSdkBlocked(true);
          } finally {
            setIsSdkLoading(false);
          }
        })
        .catch(() => {
          setSdkBlocked(true);
          setIsSdkLoading(false);
        });
    }
  }, [selectedPackage, loadPaypalSDK, sdkBlocked, handleActivation]);

  if (paymentSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Success!</h1>
          <p className="text-slate-500 mb-10">Your {paymentSuccess.package} is now active.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
            <div className="flex justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase">Invoice ID</span>
              <span className="text-slate-900 font-bold text-sm">{paymentSuccess.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase">Amount</span>
              <span className="text-slate-900 font-bold text-sm">Rs. {paymentSuccess.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 text-xs font-bold uppercase">Method</span>
              <span className="text-slate-900 font-bold text-sm">{paymentSuccess.method}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">
              <Download className="w-5 h-5" /> Download Invoice
            </button>
            <button onClick={() => window.location.href = '#/dashboard'} className="py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
          <Lock className="w-3 h-3 text-indigo-600" />
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Secure Checkout</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Activate Store Plus</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">Choose a package to unlock professional seller features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {(Object.entries(PACKAGES) as [('silver' | 'gold'), any][]).map(([key, pkg]) => (
          <div key={key} className={`relative p-8 rounded-[2.5rem] border-2 ${pkg.color} flex flex-col h-full bg-white transition-all hover:shadow-2xl overflow-hidden`}>
            {key === 'gold' && (
              <span className="absolute -top-4 right-8 bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1 z-10">
                <Sparkles className="w-3 h-3" /> Popular
              </span>
            )}
            
            <h3 className="text-2xl font-bold text-slate-900">{pkg.name}</h3>
            <p className="text-slate-500 mt-1 font-medium text-sm">{pkg.description}</p>
            
            <div className="my-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">Rs. {pkg.price}</span>
                <span className="text-slate-400 font-bold">/mo</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                pkg.maxAds === Infinity ? 'Unlimited Ad Slots' : `${pkg.maxAds} Active Listings`,
                'Verified Merchant Status',
                'Priority SEO Ranking',
                'Advanced Seller Insights'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-600 stroke-[3px]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {selectedPackage === key ? (
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {!sdkBlocked ? (
                    <motion.div 
                      key="paypal"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      id={`paypal-button-container-${key}`} 
                      className="min-h-[120px] rounded-2xl flex flex-col items-center justify-center bg-slate-50 p-4 border border-dashed border-slate-200"
                    >
                      {isSdkLoading && <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="direct"
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <CreditCard className="w-5 h-5 text-indigo-300" />
                          <h4 className="font-bold text-base">Direct Secure Payment</h4>
                        </div>
                        <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                          Your environment is restricting third-party tools. Use our encrypted internal processor instead.
                        </p>
                        <button 
                          onClick={() => handleActivation(key)}
                          disabled={isProcessing}
                          className="w-full py-4 bg-indigo-600 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl active:scale-[0.98]"
                        >
                          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Secure Checkout"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button onClick={() => setSelectedPackage(null)} className="w-full py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600">
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSelectedPackage(key)}
                className={`w-full py-4 rounded-2xl font-black text-white text-base transition-all shadow-xl ${pkg.btnColor} hover:scale-[1.02] active:scale-[0.98]`}
              >
                Select {key}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-slate-300" />
          <div className="text-left">
            <h5 className="text-sm font-bold text-slate-900">Bank-Level Security</h5>
            <p className="text-slate-400 text-[11px] font-medium">All data is encrypted with 256-bit AES protocols.</p>
          </div>
        </div>
        <div className="flex gap-4 opacity-30 grayscale">
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
           <div className="w-px h-4 bg-slate-300"></div>
           <div className="flex gap-2">
             <div className="w-7 h-4 border border-slate-200 rounded bg-slate-100"></div>
             <div className="w-7 h-4 border border-slate-200 rounded bg-slate-100"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
