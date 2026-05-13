import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { FilterBar } from '../components/FilterBar';
import { ProductSkeleton } from '../components/Skeleton';
import { Header } from '../components/Header';
import { AlertCircle, PackageX } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const {
    products,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
  } = useProducts();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Minimalist Hero Section */}
        <div className="mb-12 pt-4 md:pt-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider mb-6 border border-blue-100/50">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Premium Essentials
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
            Elevate Your <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Lifestyle Gallery</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed px-4">
            Explore our meticulously curated selection of premium essentials. 
            Where <span className="text-slate-900 font-medium italic">timeless design</span> meets <span className="text-slate-900 font-medium italic font-serif">modern innovation</span> for the discerning shopper.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="h-px w-12 bg-slate-200" />
            Verified Excellence
            <span className="h-px w-12 bg-slate-200" />
          </div>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 mb-8">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold mb-1">Error Loading Products</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : !error && products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="bg-slate-50 p-6 rounded-full mb-6">
              <PackageX className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any products matching your current filters. Try adjusting your search query or category selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="mt-6 text-blue-600 font-medium hover:text-blue-700 hover:underline transition-all"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
