import type { Product } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};
