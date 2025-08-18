import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import "@/app/globals.css";
import { CartProvider } from "@/context/cartContext";
import { AuthProvider } from "@/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title:
    "Online Shopping - Buy Tshirts, Hoodies, Mugs, Sweatshirts, Caps and Mousepads at best Price in India on CodesWear.com",
  description: "This is CodesWear.com",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AuthProvider>
        <CartProvider>
          <NextTopLoader color="#e60ed4"/>
          <Navbar />
          <div className="absolute top-0 z-[-2] h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
          <div className="mx-5 min-h-screen my-5">{children}</div>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
