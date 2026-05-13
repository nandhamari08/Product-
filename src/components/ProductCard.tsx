import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-[2rem] p-4 border border-slate-200 hover:border-transparent hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] transition-all duration-500 flex flex-col h-full relative">
      
      {/* Neat Tag / Category Badge */}
      <div className="absolute top-6 left-6 z-10">
        <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold text-slate-500 rounded-full uppercase tracking-[0.15em] shadow-sm border border-slate-200">
          {product.category}
        </span>
      </div>

      {/* Image Container with Soft Background */}
      <div className="relative aspect-square mb-6 rounded-3xl overflow-hidden bg-slate-50/50 flex items-center justify-center p-10 group-hover:bg-blue-50/30 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow px-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-700">{product.rating.rate}</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              ({product.rating.count})
            </span>
          </div>
          <span className="text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">
            In Stock
          </span>
        </div>
        
        <h3 className="text-[15px] font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>
        
        <p className="text-xs text-slate-400 line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Premium Price</span>
            <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          </div>
          
          <button className="flex items-center justify-center w-11 h-11 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(37,_99,_235,_0.2)] active:scale-90 group/btn">
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
