import { toast } from "react-toastify";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArticlesType } from "../types/articles";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: ArticlesType[];
  addProduct: (article: ArticlesType) => Promise<void>;
  removeProduct: (article: ArticlesType) => void;
  removeAllProduct: VoidFunction;
  valueTotal: any;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({
  children,
}: Readonly<CartProviderProps>): JSX.Element {
  const [cart, setCart] = useState<ArticlesType[]>(() => {
    let storageCart: any;
    if (typeof window !== "undefined") {
      storageCart = window.localStorage.getItem("@article:cart");
    }
    if (storageCart) {
      return JSON.parse(storageCart);
    }
    return [];
  });

  const [valueTotal, setValueTotal] = useState<any>(0);
  const prevCartRef = useRef<ArticlesType[]>();

  useEffect(() => {
    prevCartRef.current = cart;
    value();
  });

  const cartPreviousValues = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValues !== cart) {
      if (typeof window !== "undefined") {
        localStorage.setItem("@article:cart", JSON.stringify(cart));
        value();
      }
    }
  }, [cart, cartPreviousValues]);

  const value = async () => {
    if (cart.length === 0) {
      setValueTotal(0);
      return;
    }
    const total = cart.reduce((total: any, item) => {
      return total.amount + item.amount;
    });
    if (cart.length === 1) {
      setValueTotal(total.amount);
    } else {
      setValueTotal(total);
    }
  };

  const addProduct = async (article: ArticlesType) => {
    const updatedCart = [...cart];
    const productExists = updatedCart.find((item) => item.id === article.id);
    if (productExists) {
      toast("O produto ja adicionado");
      return;
    }
    updatedCart.push(article);
    setCart(updatedCart);
    toast("O produto foi adicionado no carrinhos");
  };

  const removeProduct = (article: ArticlesType) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (product) => product.id === article.id
      );
      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      } else {
        throw Error();
      }
      toast("O produto foi removido");
    } catch {
      toast("Erro na remoção do produto");
    }
  };

  const removeAllProduct = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, valueTotal, removeAllProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
