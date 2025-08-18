"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const CartContext = createContext();

export function CartProvider({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal,setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (newCart) => {

    localStorage.setItem("cart", JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(newCart);
    for(let i=0;i<keys.length;i++){
        subt += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemcode, name,description,img, qty, price, size, color) => {
    let newCart = cart;
    if (itemcode in newCart) {
      newCart[itemcode].qty = cart[itemcode].qty + 1;
    } else {
      newCart[itemcode] = { name,description,img, qty: 1, price, size, color };
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success("Item added successfully")
  };

   const buyNow = (slug,name,description,img,qty,price,size,color)=>{
    let newCart = {};
    newCart[slug] = {name,description,img,qty,price,size,color}
    setCart(newCart)
    saveCart(newCart)
    router.push("/checkout")
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeItemFromCart = (itemcode, name, qty, price, size, color) => {
    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty - 1;
    }
    if (newCart[itemcode].qty <= 0) {
      delete newCart[itemcode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart,removeItemFromCart,subTotal,buyNow}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
