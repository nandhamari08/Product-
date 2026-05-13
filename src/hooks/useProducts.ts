import { useState, useEffect, useMemo } from 'react';
import type { Product, SortOption } from '../types';
import { fetchProducts, fetchCategories } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters and Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption | ''>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lowerQuery));
    }

    // Filter by price range
    if (priceRange.min > 0 || priceRange.max !== null) {
      result = result.filter(p => {
        if (priceRange.max !== null) {
          return p.price >= priceRange.min && p.price <= priceRange.max;
        }
        return p.price >= priceRange.min;
      });
    }

    // Sort
    if (sortOption) {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, sortOption]);

  return {
    products: filteredAndSortedProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
  };
};
