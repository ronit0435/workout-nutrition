export type GoalType =
  | 'build-muscle'
  | 'gain-weight'
  | 'lose-fat'
  | 'increase-strength'
  | 'boost-energy'
  | 'increase-energy'
  | 'improve-performance'
  | 'recovery'
  | 'health-wellness'
  | 'general-wellness';

export type CategoryType =
  | 'Whey Protein'
  | 'Whey Isolate'
  | 'Creatine'
  | 'Pre Workout'
  | 'Mass Gainer'
  | 'BCAA & EAA'
  | 'Multivitamins'
  | 'Fish Oil'
  | 'Fat Burner'
  | 'Health & Wellness'
  | 'Glutamine & Aminos'
  | 'Carbohydrates & Recovery';

export interface NutritionFact {
  nutrient: string;
  amountPerServing: string;
  dailyValue?: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: CategoryType;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  benefits: string[];
  ingredients: string;
  servings: number;
  flavours: string[];
  sizes: string[];
  stock: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
  goals: GoalType[];
  dietary: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Gluten-Free';
  nutritionFacts: NutritionFact[];
  howToUse: string;
  flavourNotes?: string;
  whoIsItFor?: string[];
  whenToUse?: string;
  goalSupported?: string;
  whatGoalDoesItSupport?: string;
  authenticityDetails?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  origin: string;
  tagline: string;
  description: string;
  featured?: boolean;
  productCount?: number;
  badge?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedFlavour: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Verified' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
  };
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending COD';
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  productName: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
  content: string[];
  keyTakeaways: string[];
  relatedCategorySlug?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'customer' | 'admin';
  addressLine?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  createdAt?: string;
}
