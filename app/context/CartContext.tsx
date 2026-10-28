"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartablePackage } from "@/data/types";

// =======================
// 1. Types
// =======================
export type CartItem = CartablePackage & {
  id: string;
  travelers: number;
  startDate: string;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (safari: CartablePackage) => void;
  removeFromCart: (slug: string) => void;
  updateTravelers: (slug: string, travelers: number) => void;
  updateStartDate: (slug: string, date: string) => void;
  clearCart: () => void;
  total: number;
  hydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// =======================
// 2. Constants
// =======================
const STORAGE_KEY = "revelation-cart-v1";
const STORAGE_VERSION = 1;

// =======================
// 3. Provider
// =======================
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ---------- Load from localStorage on mount ----------
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.items)) {
          setItems(parsed.items as CartItem[]);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.warn("Cart: failed to load from storage", e);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  // ---------- Save to localStorage whenever items change ----------
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, items })
      );
    } catch (e) {
      console.warn("Cart: failed to save to storage", e);
    }
  }, [items, hydrated]);

  // ---------- Sync across tabs (same browser only) ----------
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.items)) {
            setItems(parsed.items as CartItem[]);
          }
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ---------- Actions ----------
  const addToCart = (safari: CartablePackage): void => {
    setItems((prev: CartItem[]) => {
      if (prev.find((item) => item.slug === safari.slug)) return prev;
      return [
        ...prev,
        {
          ...safari,
          id: `${safari.slug}-${Date.now()}-${Math.floor(Math.random() * 999)}`,
          travelers: 2,
          startDate: "",
        },
      ];
    });
  };

  const removeFromCart = (slug: string): void => {
    setItems((prev: CartItem[]) => prev.filter((item) => item.slug !== slug));
  };

  const updateTravelers = (slug: string, travelers: number): void => {
    setItems((prev: CartItem[]) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, travelers } : item
      )
    );
  };

  const updateStartDate = (slug: string, date: string): void => {
    setItems((prev: CartItem[]) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, startDate: date } : item
      )
    );
  };

  const clearCart = (): void => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.priceUSD * item.travelers,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateTravelers,
        updateStartDate,
        clearCart,
        total,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =======================
// 4. Hook
// =======================
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}