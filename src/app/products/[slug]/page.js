"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@/context/authContext";
function Product() {
  const {user}= useAuth();
  const router = useRouter();
  const { addToCart, buyNow } = useCart();
  const { slug } = useParams();
  const [isServicable, setServicable] = useState();
  const [pincode, setPincode] = useState("");
  const [product, setProducts] = useState(null);
  const [varients, setVarients] = useState();
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  const checkPincodeService = async () => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    if (data[0].Status == "Success") {
      setServicable(true);
      toast.success("Yay! We Deliver to this pincode");
    } else {
      setServicable(false);
      toast.error("Oops! Pincode is not Servicable");
    }
  };

  useEffect(() => {
    async function getData(slug) {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.product);
          setSize(data.product.size);
          setColor(data.product.color);
          setVarients(data.varients);
        } else {
          toast.error("Page Not Found");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getData(slug);
  }, [slug]);

  const refreshVarient = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/products/${varients[newColor][newSize]["slug"]}`;
    window.location = url;
  };

  return (
    <div className="container px-5 py-24 mx-auto">
      {product != null ? (
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {product?.img && (
            <Image
              alt="ecommerce"
              priority={true}
              src={product.img}
              width={500}
              height={100}
            />
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CODESWEAR
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {`${product?.title} (${size}/${color})`}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product?.description}</p>
            {/* {varients && console.log(Object.keys(varients["black"]["M"]))} */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {varients && (
                  <>
                    {Object.keys(varients).includes("white") &&
                      Object.keys(varients["white"]).includes(size) && (
                        <button
                          onClick={() => {
                            refreshVarient(size, "white");
                          }}
                          className={`border-2 bg-white cursor-pointer rounded-full w-6 h-6 focus:outline-none ${
                            color === "white"
                              ? `border-black`
                              : `border-gray-300`
                          }`}
                        ></button>
                      )}

                    {Object.keys(varients).includes("red") &&
                      Object.keys(varients["red"]).includes(size) && (
                        <button
                          onClick={() => {
                            refreshVarient(size, "red");
                          }}
                          className={`border-2 bg-red-500 cursor-pointer rounded-full w-6 h-6 focus:outline-none ${
                            color === "red" ? `border-black` : `border-gray-300`
                          }`}
                        ></button>
                      )}

                    {Object.keys(varients).includes("blue") &&
                      Object.keys(varients["blue"]).includes(size) && (
                        <button
                          onClick={() => {
                            refreshVarient(size, "blue");
                          }}
                          className={`border-2 bg-blue-600 cursor-pointer rounded-full w-6 h-6 focus:outline-none ${
                            color === "blue"
                              ? `border-black`
                              : `border-gray-300`
                          }`}
                        ></button>
                      )}

                    {Object.keys(varients).includes("pink") &&
                      Object.keys(varients["pink"]).includes(size) && (
                        <button
                          onClick={() => {
                            refreshVarint(size, "pink");
                          }}
                          className={`border-2 bg-pink-500 cursor-pointer rounded-full w-6 h-6 focus:outline-none ${
                            color === "pink"
                              ? `border-black`
                              : `border-gray-300`
                          }`}
                        ></button>
                      )}

                    {Object.keys(varients).includes("black") &&
                      Object.keys(varients["black"]).includes(size) && (
                        <button
                          onClick={() => {
                            refreshVarient(size, "black");
                          }}
                          className={`border-2 border-gray-300 cursor-pointer bg-black rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      )}
                  </>
                )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Avl Size</span>
                <div>
                  <select
                    onChange={(e) => {
                      refreshVarient(e.target.value, color);
                    }}
                    value={product?.size}
                    className="cursor-pointer rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                  >
                    {varients && (
                      <>
                        {Object.keys(varients[color]).includes("standard") && (
                          <option value={"standard"}>STANDARD</option>
                        )}
                        {Object.keys(varients[color]).includes("S") && (
                          <option value={"S"}>S</option>
                        )}
                        {Object.keys(varients[color]).includes("M") && (
                          <option value={"M"}>M</option>
                        )}
                        {Object.keys(varients[color]).includes("L") && (
                          <option value={"L"}>L</option>
                        )}
                        {Object.keys(varients[color]).includes("XL") && (
                          <option value={"XL"}>XL</option>
                        )}
                        {Object.keys(varients[color]).includes("XXL") && (
                          <option value={"XXL"}>XXL</option>
                        )}
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
            {product?.avlQty == 0 ? (
              <p className="my-3 text-red-500">This Item is Out of Stock</p>
            ) : (
              <p className="my-3 text-pink-500">
                Item is Available Avl Qty : {product?.avlQty}
              </p>
            )}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{product?.price}
              </span>
              <button
                disabled={product?.avlQty == 0}
                onClick={() => {
                  addToCart(
                    slug,
                    product?.title,
                    product?.description,
                    product?.img,
                    1,
                    product?.price,
                    product?.size,
                    product?.color
                  );
                }}
                className={`flex ml-4 text-white ${
                  product?.avlQty == 0 ? "bg-pink-300" : "bg-pink-500 "
                } border-0 py-2 px-3 md:px-6 focus:outline-none rounded-full cursor-pointer`}
              >
                Add to Cart
              </button>
              <button
                disabled={product?.avlQty == 0}
                onClick={() => {
                  if (user) {
                    buyNow(
                      slug,
                      product?.title,
                      product?.description,
                      product?.img,
                      1,
                      product?.price,
                      product?.size,
                      product?.color
                    );
                  }else{
                    toast.error("Please Login First.")
                    router.push("/login")
                  }
                }}
                className={`flex ml-4 text-white ${
                  product?.avlQty == 0 ? "bg-pink-300" : "bg-pink-500 "
                } border-0 py-2 px-3  md:px-6 focus:outline-none rounded-full cursor-pointer`}
              >
                Buy Now
              </button>
            </div>
            <div className="mt-4 flex">
              <input
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
                type="number"
                required
                className="border p-2 rounded-full focus:border-pink-500 focus:outline-none w-full sm:w-50"
                placeholder="Enter Pincode"
              />
              <button
                onClick={checkPincodeService}
                className="cursor-pointer ms-3  bg-pink-500 text-white py-2 px-4 rounded-full "
              >
                Check{" "}
              </button>
            </div>
            {isServicable != undefined &&
              (isServicable ? (
                <p className="text-green-500 font-semibold mt-2">
                  Yay! We Deliver to this pincode
                </p>
              ) : (
                <p className="text-red-500 font-semibold mt-2">
                  Sorry! This pincode is not servicable
                </p>
              ))}
          </div>
        </div>
      ) : (
        <div className="my-2 flex justify-center">
          <CircularProgress style={{ color: "#cc0dd6" }} />
        </div>
      )}
    </div>
  );
}

export default Product;
