
import React from 'react';
import { useParams } from 'react-router-dom';

const AdDetails: React.FC = () => {
  const { id } = useParams();
  
  // Mock data for demo
  const ad = {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB Titanium',
    price: 145000,
    category: 'Electronics',
    location: 'Colombo, SL',
    description: `Original brand new sealed pack. Global version. 
    1 year warranty available. Genuine buyers only. 
    Price is slightly negotiable. 
    Island-wide delivery available.`,
    images: [
      'https://picsum.photos/800/600?1',
      'https://picsum.photos/800/600?2',
      'https://picsum.photos/800/600?3'
    ],
    seller: {
      username: 'iShop Colombo',
      full_name: 'Isuru Perera',
      whatsapp_number: '+94771234567',
      rating: 4.8,
      verified: true
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in your ad: ${ad.title}. Is it still available? (Link: ${window.location.href})`);
    window.open(`https://wa.me/${ad.seller.whatsapp_number.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <span className="hover:text-indigo-600 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-indigo-600 cursor-pointer">{ad.category}</span>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium truncate">{ad.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="aspect-[4/3]">
              <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex gap-4 overflow-x-auto custom-scrollbar">
              {ad.images.map((img, i) => (
                <div key={i} className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-slate-100 hover:border-indigo-500 cursor-pointer transition-all">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Description</h2>
            <div className="prose prose-slate max-w-none">
              {ad.description.split('\n').map((line, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-2">{line}</p>
              ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</p>
                <p className="mt-1 font-semibold text-slate-800">{ad.category}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Posted</p>
                <p className="mt-1 font-semibold text-slate-800">2 days ago</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Views</p>
                <p className="mt-1 font-semibold text-slate-800">1,245</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Condition</p>
                <p className="mt-1 font-semibold text-slate-800">Brand New</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <div className="mb-6">
              <span className="text-3xl font-extrabold text-indigo-600">Rs. {ad.price.toLocaleString()}</span>
              <p className="text-slate-400 text-sm mt-1">Price is negotiable</p>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">{ad.title}</h1>
            
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-slate-700">{ad.location}</span>
            </div>

            <button 
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-100 mb-4"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </button>
            <button className="w-full py-4 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Save to Favorites
            </button>
            
            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
              <img src={`https://ui-avatars.com/api/?name=${ad.seller.username}`} className="w-14 h-14 rounded-full border border-slate-100" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seller</p>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-slate-900">{ad.seller.username}</p>
                  {ad.seller.verified && <span className="text-blue-500">✓</span>}
                </div>
                <p className="text-sm text-yellow-500">⭐ {ad.seller.rating} rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
