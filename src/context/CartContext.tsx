import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, FragranceSize, CartItem } from '../types';
import { calculatePriceBySize } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: FragranceSize, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  giftWrap: boolean;
  setGiftWrap: (val: boolean) => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedItem: CartItem | null;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vanter_cart_v1';
const GIFT_WRAP_KEY = 'vanter_gift_wrap_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [giftWrap, setGiftWrapState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(GIFT_WRAP_KEY);
      return saved === 'true';
    } catch {
      return true; // complimentary by default
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  const setGiftWrap = (val: boolean) => {
    setGiftWrapState(val);
    try {
      localStorage.setItem(GIFT_WRAP_KEY, String(val));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, size: FragranceSize = '100ml', quantity = 1) => {
    const unitPrice = calculatePriceBySize(product.price100ml, size);
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    let updatedCart: CartItem[];
    let targetItem: CartItem;

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      targetItem = updatedCart[existingIndex];
    } else {
      targetItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        product,
        size,
        quantity,
        unitPrice,
      };
      updatedCart = [targetItem, ...cart];
    }

    setCart(updatedCart);
    setLastAddedItem(targetItem);
    showToast(`Added ${product.name} (${size}) to your collection`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
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

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        giftWrap,
        setGiftWrap,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
        toastMessage,
        showToast,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

