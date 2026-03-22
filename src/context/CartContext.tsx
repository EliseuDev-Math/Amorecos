import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  emoji: string;
  price: number;
  color: string;
  colorHex: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: number, color: string) => void;
  updateQuantity: (productId: number, color: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(p => !p), []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productId === item.productId && i.color === item.color);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: number, color: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.color === color)));
  }, []);

  const updateQuantity = useCallback((productId: number, color: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => !(i.productId === productId && i.color === color)));
      return;
    }
    setItems(prev => prev.map(i =>
      i.productId === productId && i.color === color ? { ...i, quantity: qty } : i
    ));
  }, []);

  const clearCart = useCallback(() => { setItems([]); setIsOpen(false); }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, openCart, closeCart, toggleCart,
      addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
