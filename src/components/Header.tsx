import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/70 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-[60] h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex justify-between items-center">

          {/* Brand Identity */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:scale-105 transition-all duration-500">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-none tracking-tight">
                SHOP<span className="text-blue-600"> GRID</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
                Premium Gallery
              </span>
            </div>
          </div>

          {/* Navigation Links - Boutique Style */}
          <nav className="hidden lg:flex items-center bg-slate-50/50 p-1.5 rounded-[1.5rem] border border-slate-200">
            <a href="#" className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-white rounded-2xl shadow-sm border border-slate-200">Store</a>
            <a href="#" className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all duration-300">Collections</a>
            <a href="#" className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all duration-300">Trending</a>
            <a href="#" className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all duration-300">About</a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <button className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors">Sign In</button>
              <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 hover:bg-blue-600 hover:shadow-[0_15px_30px_rgba(37,99,235,0.2)] active:scale-95">
                Join Now
              </button>
            </div>

            <button className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm">
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
