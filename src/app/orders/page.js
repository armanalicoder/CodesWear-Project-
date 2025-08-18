"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
function Orders() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/myorder`);
        const data = await res.json();
        if (!data.orderFound) {
          setOrders([]);
          toast.error("No Order Found. Shop Now!");
        } else {
          setOrders(data.order);
        }
      } catch (err) {
        console.log(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if(user){
    fetchOrders();
  }else{
    toast.error("You are not logged in.")
    router.push("/")
  }
  }, [user]);
  return (
    <>
      {user ? (
        <div>
          <h1 className="text-center text-xl p-5 font-semibold">My Orders</h1>
          {!loading ? (
            orders?.map((order) => {
              return (
                <div
                  key={order._id}
                  className="rounded-lg p-4 max-w-4xl mx-auto"
                >
                  {/* Order Info */}
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order number</p>
                      <p className="font-medium">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date placed</p>
                      <p className="font-medium">
                        {new Date(order.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total amount</p>
                      <p className="font-medium">₹{order.amount}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Link
                        href={"#"}
                        className="px-4 py-1 border rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        Track Order
                      </Link>
                    </div>
                  </div>

                  <hr className="my-3" />
                  {Object.keys(order.products).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 mb-3"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={order.products[item].img}
                            alt="Product"
                            className="w-28 h-28 rounded-md"
                            width={80}
                            height={20}
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900">
                                {order.products[item]?.name}
                              </h3>
                              <span className="font-medium">
                                ₹{order.products[item].price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              {order.products[item]?.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <p className="flex items-center text-sm text-green-600 font-medium">
                              <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
                              Delivered on January 5, 2021
                            </p>
                            <div className="flex gap-4 text-sm font-medium">
                              <Link
                                href={`/order?order_id=${order.orderId}`}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                View product
                              </Link>
                              <Link
                                href={`/products/${item}`}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                Buy again
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <hr className="my-8" />
                </div>
              );
            })
          ) : (
            <p className="text-center text-semibold">Loading...</p>
          )}
          {!loading && orders.length == 0 && <p className="text-center">No Order Found. Shop Now</p>}
        </div>
      ) : (
        <div className="my-2 flex justify-center">
          <CircularProgress style={{ color: "#cc0dd6" }} />
        </div>
      )}
    </>
  );
}

export default Orders;
