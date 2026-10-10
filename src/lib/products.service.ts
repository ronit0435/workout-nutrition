import { supabase } from './supabase';
import { Product } from '../types';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';

// Helper to map DB row (snake_case) to Product interface (camelCase)
export function mapDbProductToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    discount: Number(row.discount),
    rating: Number(row.rating ?? 5.0),
    reviewCount: Number(row.review_count ?? 0),
    images: Array.isArray(row.images) ? row.images : [],
    description: row.description || '',
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    ingredients: row.ingredients || '',
    servings: Number(row.servings ?? 1),
    flavours: Array.isArray(row.flavours) ? row.flavours : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    stock: Number(row.stock ?? 0),
    isBestSeller: Boolean(row.is_best_seller),
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    tags: Array.isArray(row.tags) ? row.tags : [],
    goals: Array.isArray(row.goals) ? row.goals : [],
    dietary: row.dietary || 'Vegetarian',
    nutritionFacts: Array.isArray(row.nutrition_facts) ? row.nutrition_facts : [],
    howToUse: row.how_to_use || '',
    flavourNotes: row.flavour_notes,
    whoIsItFor: Array.isArray(row.who_is_it_for) ? row.who_is_it_for : [],
    whenToUse: row.when_to_use || '',
    goalSupported: row.goal_supported,
    whatGoalDoesItSupport: row.what_goal_does_it_support,
    authenticityDetails: row.authenticity_details,
  };
}

// Helper to map Product interface to DB row
export function mapProductToDbRow(product: Partial<Product>): any {
  const row: any = {};
  if (product.id !== undefined) row.id = product.id;
  if (product.slug !== undefined) row.slug = product.slug;
  if (product.brand !== undefined) row.brand = product.brand;
  if (product.name !== undefined) row.name = product.name;
  if (product.category !== undefined) row.category = product.category;
  if (product.subcategory !== undefined) row.subcategory = product.subcategory;
  if (product.price !== undefined) row.price = product.price;
  if (product.originalPrice !== undefined) row.original_price = product.originalPrice;
  if (product.discount !== undefined) row.discount = product.discount;
  if (product.rating !== undefined) row.rating = product.rating;
  if (product.reviewCount !== undefined) row.review_count = product.reviewCount;
  if (product.images !== undefined) row.images = product.images;
  if (product.description !== undefined) row.description = product.description;
  if (product.benefits !== undefined) row.benefits = product.benefits;
  if (product.ingredients !== undefined) row.ingredients = product.ingredients;
  if (product.servings !== undefined) row.servings = product.servings;
  if (product.flavours !== undefined) row.flavours = product.flavours;
  if (product.sizes !== undefined) row.sizes = product.sizes;
  if (product.stock !== undefined) row.stock = product.stock;
  if (product.isBestSeller !== undefined) row.is_best_seller = product.isBestSeller;
  if (product.isFeatured !== undefined) row.is_featured = product.isFeatured;
  if (product.isNew !== undefined) row.is_new = product.isNew;
  if (product.tags !== undefined) row.tags = product.tags;
  if (product.goals !== undefined) row.goals = product.goals;
  if (product.dietary !== undefined) row.dietary = product.dietary;
  if (product.nutritionFacts !== undefined) row.nutrition_facts = product.nutritionFacts;
  if (product.howToUse !== undefined) row.how_to_use = product.howToUse;
  if (product.flavourNotes !== undefined) row.flavour_notes = product.flavourNotes;
  if (product.whoIsItFor !== undefined) row.who_is_it_for = product.whoIsItFor;
  if (product.whenToUse !== undefined) row.when_to_use = product.whenToUse;
  if (product.goalSupported !== undefined) row.goal_supported = product.goalSupported;
  if (product.whatGoalDoesItSupport !== undefined) row.what_goal_does_it_support = product.whatGoalDoesItSupport;
  if (product.authenticityDetails !== undefined) row.authenticity_details = product.authenticityDetails;
  row.updated_at = new Date().toISOString();
  return row;
}

export const productsService = {
  /**
   * Fetch all products from Supabase.
   * If table does not exist or has no rows, seamlessly fallbacks to local STATIC_PRODUCTS.
   */
  async getProducts(): Promise<{ products: Product[]; isFallback: boolean }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        if (error) {
          console.warn('Supabase products fetch failed, using fallback catalog:', error.message);
        }
        return { products: STATIC_PRODUCTS, isFallback: true };
      }

      return {
        products: data.map(mapDbProductToProduct),
        isFallback: false,
      };
    } catch (err) {
      console.error('Error fetching products:', err);
      return { products: STATIC_PRODUCTS, isFallback: true };
    }
  },

  /**
   * Insert a new product into Supabase
   */
  async createProduct(product: Product): Promise<{ product: Product | null; error: Error | null }> {
    try {
      const dbRow = mapProductToDbRow(product);
      const { data, error } = await supabase
        .from('products')
        .insert([dbRow])
        .select()
        .single();

      if (error) throw error;
      return { product: mapDbProductToProduct(data), error: null };
    } catch (err: any) {
      return { product: null, error: err instanceof Error ? err : new Error(err.message) };
    }
  },

  /**
   * Update an existing product in Supabase
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<{ product: Product | null; error: Error | null }> {
    try {
      const dbRow = mapProductToDbRow(updates);
      const { data, error } = await supabase
        .from('products')
        .update(dbRow)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { product: mapDbProductToProduct(data), error: null };
    } catch (err: any) {
      return { product: null, error: err instanceof Error ? err : new Error(err.message) };
    }
  },

  /**
   * Delete a product from Supabase
   */
  async deleteProduct(id: string): Promise<{ success: boolean; error: Error | null }> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err instanceof Error ? err : new Error(err.message) };
    }
  },

  /**
   * Upload an image to Supabase Storage bucket 'product-images'
   */
  async uploadImage(file: File): Promise<{ url: string | null; error: Error | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (err: any) {
      return { url: null, error: err instanceof Error ? err : new Error(err.message) };
    }
  },
};
