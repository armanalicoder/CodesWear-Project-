"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { IoHomeSharp } from "react-icons/io5";
import { useAuth } from "@/context/authContext";
import { FaUserCircle } from "react-icons/fa";
function Navbar() {
  const { cart, clearCart, addToCart, removeItemFromCart, subTotal } =
    useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const menuref = useRef();
  const blurref = useRef();
  const cartref = useRef();
  const toggleMenu = () => {
    if (
      menuref.current.classList.contains(
        "translate-x-full" || blurref.current.classList.contains("hidden")
      )
    ) {
      menuref.current.classList.remove("translate-x-full");
      blurref.current.classList.remove("hidden");
    } else {
      menuref.current.classList.add("translate-x-full");
      blurref.current.classList.add("hidden");
    }
  };
  const toggleCart = () => {
    if (
      cartref.current.classList.contains(
        "translate-x-200" || blurref.current.classList.contains("hidden")
      )
    ) {
      cartref.current.classList.remove("translate-x-200");
      blurref.current.classList.remove("hidden");
    } else {
      cartref.current.classList.add("translate-x-200");
      blurref.current.classList.add("hidden");
    }
  };
  return (
    <>
      <nav className="sticky top-0  bg-white">
        <div className="p-2 mx-3 flex justify-between items-center">
          <div className="xs:flex-col xl:flex items-center w-full">
            <div className="flex justify-between items-center">
              <Link href={"/"}>
                <img src="/logo.png" alt="logo" width={220} height={50} />
              </Link>
              <div
                className="xl:hidden mt-2 cursor-pointer"
                onClick={toggleMenu}
              >
                <FaBars className="text-2xl" />
              </div>
            </div>
            <div
              ref={blurref}
              className="hidden absolute top-0 left-0 bg-[rgb(0,0,0,0.6)] h-screen w-full"
            ></div>
            <div
              ref={menuref}
              className="absolute top-0 right-0 backdrop-blur-sm shadow-lg text-white p-10 h-full transform transition-transform translate-x-full"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">Codeswear.com</h1>
                  <div className="ms-10 cursor-pointer" onClick={toggleMenu}>
                    <IoMdClose className="text-2xl" />
                  </div>
                </div>
                <ul className="space-y-10">
                  <li className="hover:bg-white/5 p-2 rounded">
                    <Link href={"/tshirts"}>T-Shirts</Link>
                  </li>
                  <li className="hover:bg-white/5 p-2 rounded">
                    <Link href={"/hoodies"}>Hoodies</Link>
                  </li>
                  <li className="hover:bg-white/5 p-2 rounded">
                    <Link href={"/zipper"}>Zipper</Link>
                  </li>
                  <li className="hover:bg-white/5 p-2 rounded">
                    <Link href={"/mousepads"}>Mousepads</Link>
                  </li>
                  <li className="hover:bg-white/5 p-2 rounded">
                    <Link href={"/caps"}>Caps</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <input
                  type="text"
                  placeholder="Search Any Item.."
                  className="border p-2 rounded-md sm:w-100 md:150 lg:w-200 xl:w-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div className="ms-3">
                <button className="bg-pink-500 cursor-pointer text-white p-2 text-2xl rounded">
                  <IoIosSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="xl:ms-2">
            <div className="xl:flex items-center space-x-3">
              <div className="hidden xl:flex gap-3 font-semibold">
                <ul className="flex items-center gap-4">
                  <li>
                    <Link className="hover:text-pink-500" href={"/tshirts"}>
                      Tshirts
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-pink-500" href={"/hoodies"}>
                      Hoodies
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-pink-500" href={"/mousepads"}>
                      Mousepads
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-pink-500" href={"/caps"}>
                      Caps
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-pink-500" href={"/sweatshirts"}>
                      SweatShirts
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-pink-500" href={"/mugs"}>
                      Mugs
                    </Link>
                  </li>
                </ul>
                <div className="cursor-pointer relative" onClick={toggleCart}>
                  <MdOutlineShoppingCart className="text-3xl text-pink-500" />
                  <div className="bg-pink-500 absolute h-6 w-6 rounded-full -top-3 left-4 text-center text-white">
                    {Object.keys(cart).length}
                  </div>
                </div>

                {!isLoggedIn ? (
                  <Link href={"/login"}>
                    <button className="bg-pink-500 cursor-pointer text-white py-2 px-3 rounded">
                      Login
                    </button>
                  </Link>
                ) : (
                  <div
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  >
                    <button className="bg-pink-500 cursor-pointer text-white p-2 rounded-full">
                      <FaUserCircle />
                    </button>
                    {isMenuOpen && (
                      <div className="bg-white space-y-2 absolute right-10 shadow-lg rounded-md px-10 border">
                        <div>
                          <Link href={"/myaccount"}>My Account</Link>
                        </div>
                        <div>
                          <Link href={"/orders"}>My Orders</Link>
                        </div>
                        <div className="mb-2">
                          <button className="cursor-pointer" onClick={logout}>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <MdDarkMode className="text-3xl text-pink-500" />
              </div>

              <div
                ref={cartref}
                className="overflow-y-auto z-[9999]  fixed text-black top-0 -right-3 xl:w-130 bg-pink-200 backdrop-blur-sm shadow-lg p-10 h-screen transform transition-transform translate-x-200"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                      Your Shopping Cart
                    </h1>
                    <div className="ms-10 cursor-pointer" onClick={toggleCart}>
                      <IoMdClose className="text-2xl" />
                    </div>
                  </div>

                  {Object.keys(cart).length == 0 && (
                    <p className="text-red-500 text-center">
                      Your cart is empty!
                    </p>
                  )}
                  {Object.keys(cart).map((item, index) => {
                    return (
                      <div key={item} className="flex p-2 items-center">
                        <div className="flex items-center">
                          <Image
                            src={cart[item].img}
                            alt="cart"
                            width={60}
                            height={30}
                          />
                          <h1 className="break-words p-4">
                            {cart[item].name}({cart[item].size}/
                            {cart[item].color})
                          </h1>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => {
                              removeItemFromCart(
                                item,
                                cart[item].name,
                                cart[item].qty,
                                cart[item].price,
                                cart[item].size,
                                cart[item].color
                              );
                            }}
                          >
                            <FaMinusCircle className="text-pink-500 text-xl" />
                          </span>
                          <span>{cart[item].qty}</span>
                          <span
                            onClick={() => {
                              addToCart(
                                item,
                                cart[item].name,
                                cart[item].qty,
                                cart[item].price,
                                cart[item].size,
                                cart[item].color
                              );
                            }}
                          >
                            <FaPlusCircle className="text-pink-500 text-xl" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(cart).length != 0 && (
                    <div>
                      <p className="font-bold">SubTotal : ₹{subTotal}</p>
                    </div>
                  )}

                  <div className="flex justify-center gap-4">
                    <div>
                      <Link href={"/checkout"}>
                        <button
                          disabled={Object.keys(cart).length == 0}
                          className={`${
                            Object.keys(cart).length == 0
                              ? "bg-pink-300"
                              : "bg-pink-500"
                          } text-white p-2 rounded cursor-pointer`}
                        >
                          <IoBag className="inline mb-1 me-1" />
                          Checkout
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button
                        disabled={Object.keys(cart).length == 0}
                        onClick={clearCart}
                        className={`${
                          Object.keys(cart).length == 0
                            ? "bg-pink-300"
                            : "bg-pink-500"
                        } text-white p-2 rounded cursor-pointer`}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <footer className="lg:hidden">
        <div className="p-5 w-full bg-white flex justify-between items-center fixed bottom-0">
          <div>
            <Link className="text-2xl" href={"/"}>
              <IoHomeSharp />
            </Link>
          </div>
          <div>
            <Link className="text-2xl" href={"/"}>
              <FaSearch />
            </Link>
          </div>
          <div className="cursor-pointer relative" onClick={toggleCart}>
            <MdOutlineShoppingCart className="text-3xl" />
            <div className="bg-pink-500 absolute h-6 w-6 rounded-full -top-3 left-4 text-center text-white">
              {Object.keys(cart).length}
            </div>
          </div>
          <div>
            <Link className="text-2xl" href={"/"}>
              <MdDarkMode />
            </Link>
          </div>
          {isLoggedIn ? 
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <button className="cursor-pointer text-2xl p-2 rounded-full">
              <FaUserCircle />
            </button>

            {isMenuOpen && (
              <div className="bg-white space-y-2 absolute right-2 bottom-15 shadow-lg rounded-md px-10 border">
                <div>
                  <Link href={"/myaccount"}>My Account</Link>
                </div>
                <div>
                  <Link href={"/orders"}>My Orders</Link>
                </div>
                <div className="mb-2">
                  <button className="cursor-pointer" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          :<Link href={"/login"} className="bg-pink-500 py-2 px-3 rounded text-white">Login</Link>
          }
          
        </div>
      </footer>
    </>
  );
}

export default Navbar;
