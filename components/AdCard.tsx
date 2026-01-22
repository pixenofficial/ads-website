
import React from 'react';
import { Link } from 'react-router-dom';
import { Ad } from '../types';
import { MapPin, Heart, Clock, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/ad/${ad.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img 
            src={ad.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'} 
            alt={ad.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wider">
            {ad.category}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 text-base">{ad.title}</h3>
          
          <div className="flex items-center gap-4 mt-2">
            <p className="text-slate-500 text-xs flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-slate-400" />
              {ad.location}
            </p>
            <p className="text-slate-500 text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1 text-slate-400" />
              2h ago
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Price</span>
              <span className="text-lg font-extrabold text-indigo-600">Rs. {ad.price.toLocaleString()}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <PlusCircle className="h-4 w-4 text-slate-300 group-hover:text-indigo-600" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AdCard;
