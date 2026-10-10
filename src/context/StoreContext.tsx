import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order } from '../types';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import { productsService } from '../lib/products.service';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'categories'
  | 'product'
  | 'category'
  | 'brand'
  | 'goal'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'account'
  | 'track-order'
  | 'about'
  | 'contact'
  | 'article'
  | 'faq'
  | 'shipping-policy'
  | 'return-policy'
  | 'terms'
  | 'demo-orders'
  | 'admin';

export interface RouteParams {
  productId?: string;
  categorySlug?: string;
  brandSlug?: string;
  goalSlug?: string;
  orderId?: string;
  searchQuery?: string;
  articleSlug?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Products
  products: Product[];
  refreshProducts: () => Promise<void>;
  isLoadingProducts: boolean;

  // Navigation
  currentPage: PageRoute;
  routeParams: RouteParams;
  navigate: (page: PageRoute, params?: RouteParams) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, flavour?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;

  // Search & Modals
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Orders & Checkout
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => Order;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

const getInitialPageFromUrl = (): PageRoute => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (path === 'admin' || hash === 'admin') return 'admin';
  if (path === 'shop' || hash === 'shop') return 'shop';
  if (path === 'account' || hash === 'account') return 'account';
  if (path === 'cart' || hash === 'cart') return 'cart';
  if (path === 'checkout' || hash === 'checkout') return 'checkout';
  if (path === 'wishlist' || hash === 'wishlist') return 'wishlist';
  return 'home';
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Live Products State
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const loadProducts = async () => {
    setIsLoadingProducts(true);
    const { products: fetched } = await productsService.getProducts();
    setProducts(fetched);
    setIsLoadingProducts(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPageFromUrl);
  const [routeParams, setRouteParams] = useState<RouteParams>({});

  // Keep the browser Back/Forward buttons in sync with this React SPA.
  useEffect(() => {
    const initialState = window.history.state;
    const urlPage = getInitialPageFromUrl();

    if (urlPage !== 'home') {
      setCurrentPage(urlPage);
      window.history.replaceState(
        { appRoute: true, page: urlPage, params: {} },
        '',
        window.location.href
      );
    } else if (initialState?.appRoute && initialState.page) {
      setCurrentPage(initialState.page as PageRoute);
      setRouteParams(initialState.params || {});
    } else {
      window.history.replaceState(
        { appRoute: true, page: 'home', params: {} },
        '',
        window.location.href
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;

      if (state?.appRoute && state.page) {
        setCurrentPage(state.page as PageRoute);
        setRouteParams(state.params || {});
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        setCurrentPage(getInitialPageFromUrl());
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Cart State (Persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State (Persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ironforge_orders');
      if (saved) return JSON.parse(saved);
      // Seed initial sample order for realistic demo
      return [
        {
          id: 'IF-89241',
          date: 'Yesterday, 14:32',
          items: [
            {
              id: 'on-gold-standard-100-whey-Double Rich Chocolate-5 lbs (2.27 kg)',
              product: STATIC_PRODUCTS[0],
              quantity: 1,
              selectedFlavour: 'Double Rich Chocolate',
              selectedSize: '5 lbs (2.27 kg)',
            },
            {
              id: 'muscletech-platinum-creatine-Unflavoured-250g (83 Servings)',
              product: STATIC_PRODUCTS[1],
              quantity: 1,
              selectedFlavour: 'Unflavoured',
              selectedSize: '250g (83 Servings)',
            },
          ],
          subtotal: 4448,
          discount: 444,
          shipping: 0,
          total: 4004,
          status: 'In Transit',
          trackingNumber: 'DELHIVERY-981240192',
          shippingAddress: {
            fullName: 'Arjun Mehra',
            phone: '+91 98765 43210',
            addressLine: 'Flat 402, Skyline Residency, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pinCode: '400050',
          },
          paymentMethod: 'UPI (Google Pay)',
          paymentStatus: 'Paid',
        },
      ];
    } catch {
      return [];
    }
  });

  // UI Drawer / Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('ironforge_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('ironforge_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem('ironforge_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigate = (page: PageRoute, params: RouteParams = {}) => {
    const newUrl = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(
      { appRoute: true, page, params },
      '',
      newUrl
    );

    setCurrentPage(page);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const addToCart = (product: Product, quantity = 1, flavour?: string, size?: string) => {
    const selectedFlavour = flavour || product.flavours[0] || 'Standard';
    const selectedSize = size || product.sizes[0] || 'Standard';
    const itemId = `${product.id}-${selectedFlavour}-${selectedSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, quantity, selectedFlavour, selectedSize }];
    });

    addToast(`Added to Cart`, `${product.name} (${selectedFlavour}, ${selectedSize})`, 'success');
    setCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Removed from cart', undefined, 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount Calculation
  let discountAmount = 0;
  if (appliedCoupon === 'WORKOUT10' || appliedCoupon === 'IRON10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'FITINDIA') {
    discountAmount = Math.min(cartSubtotal, 250);
  } else if (appliedCoupon === 'BULK500') {
    discountAmount = cartSubtotal >= 5000 ? 500 : 0;
  }

  const shippingFee = cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'WORKOUT10' || formatted === 'IRON10') {
      setAppliedCoupon('WORKOUT10');
      addToast('Coupon Applied!', '10% instant discount applied to your order', 'success');
      return true;
    }
    if (formatted === 'FITINDIA') {
      setAppliedCoupon('FITINDIA');
      addToast('Coupon Applied!', 'Flat ₹250 discount applied', 'success');
      return true;
    }
    if (formatted === 'BULK500') {
      if (cartSubtotal >= 5000) {
        setAppliedCoupon('BULK500');
        addToast('Coupon Applied!', '₹500 off applied on bulk order', 'success');
        return true;
      } else {
        addToast('Coupon Invalid', 'Requires minimum cart value of ₹5,000', 'error');
        return false;
      }
    }
    addToast('Invalid Coupon', 'Please check promo code or try "IRON10"', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', undefined, 'info');
  };

  // Wishlist Functions
  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addToast('Removed from Wishlist', product.name, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Added to Wishlist', product.name, 'success');
    }
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Order Creation
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `IF-${randomNum}`,
      date: 'Just now',
      status: 'Processing',
      trackingNumber: `DELHIVERY-${Math.floor(100000000 + Math.random() * 900000000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        refreshProducts: loadProducts,
        isLoadingProducts,
        currentPage,
        routeParams,
        navigate,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartOpen,
        setCartOpen,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        searchOpen,
        setSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
