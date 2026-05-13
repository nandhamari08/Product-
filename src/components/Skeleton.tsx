import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col h-full animate-pulse">
      {/* Category Badge Skeleton */}
      <div className="w-24 h-6 bg-slate-200 rounded-full mb-4"></div>
      
      {/* Image Skeleton */}
      <div className="h-64 bg-slate-100 rounded-xl mb-6"></div>
      
      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow">
        {/* Rating */}
        <div className="w-16 h-4 bg-slate-200 rounded mb-4"></div>
        
        {/* Title */}
        <div className="w-full h-6 bg-slate-200 rounded mb-2"></div>
        <div className="w-2/3 h-6 bg-slate-200 rounded mb-4"></div>
        
        {/* Description */}
        <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
        <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
        <div className="w-4/5 h-4 bg-slate-100 rounded mb-6 flex-grow"></div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="w-20 h-8 bg-slate-200 rounded"></div>
          <div className="w-11 h-11 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
