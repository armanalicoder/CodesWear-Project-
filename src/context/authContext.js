"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      try {
        const res = await fetch("/api/authenticate", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user || null);
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    authUser();
  },[]);

  const logout = async()=>{
    const res = await fetch("/api/logout");
    const data = await res.json();
    if(data.logout){
        toast.error("You are logged out.")
        setIsLoggedIn(false)
        router.push("/")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn,setIsLoggedIn, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
