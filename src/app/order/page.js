"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
function Order() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const orderid = searchParams.get("order_id");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (orderid) {
          const res = await fetch(`/api/order/${orderid}`);
          const data = await res.json();
          if (data.orderFound) {
            setOrder(data.order);
            setProducts(data.order.products);
          } else {
            toast.error("No Order Found!");
            router.push("/");
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchOrder();
    } else {
      toast.error("you are not logged in");
      router.push("/");
    }
  }, [user,orderid]);
  return (
    <div className="flex items-center justify-center p-4">
      {order != null ? (
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 md:p-10">
          {/* Title */}
          <h2 className="text-2xl font-bold text-pink-600 mb-6">
            Order Summary
          </h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shipping & Billing Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Shipping & Billing Info
              </h3>
              <p className="text-sm">
                <span className="font-medium">Name:</span>{" "}
                {order?.address?.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Email Address:</span>{" "}
                {order?.address?.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone Number:</span>{" "}
                {order?.address?.number}
              </p>
              <p className="text-sm">
                <span className="font-medium">Shipping Address:</span>
                <br />
                {order?.address?.address} {order?.address?.pincode}
              </p>
            </div>

            {/* Payment + Shipping Method */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <p className="text-sm">
                <span className="font-medium">Payment:</span> Online
                <br />
                <span className="font-medium">Order Id : </span>{" "}
                {order?.orderId}
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-4">
                Shipping Method
              </h3>
              <p className="text-sm">
                <span className="font-medium">Shipping:</span> Post Service
                (Item Will be delivered within 7 Days)
              </p>
              <p className="text-sm mt-2">
                <span className="font-medium">Note:</span> If you have any query
                related to this order contact at abc@gmail.com
              </p>
            </div>

            {/* Items in Cart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Items in your Shopping Cart
              </h3>
              {products != undefined &&
                Object.keys(products).map((item) => {
                  return (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b py-4"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={products[item].img}
                          alt="item"
                          className="rounded-lg object-cover"
                          width={80}
                          height={16}
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {products[item].name}
                          </p>
                          <p className="text-xs">
                            {products[item].description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Size: {products[item].size} | Qty:{" "}
                            {products[item].qty}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-pink-600">
                        ₹{products[item].price}
                      </p>
                    </div>
                  );
                })}

              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">Paid Amount:</p>
                <p className="text-lg font-bold text-pink-600">
                  ₹{order?.amount}
                </p>
              </div>
            </div>
          </div>
          <Link href={"/orders"} className="bg-pink-500 p-2 rounded text-white">
            My Orders
          </Link>
          <div className="mt-8 border-t pt-6 text-center">
            <p className="text-gray-600">Thank you for shopping with us!</p>
            <a href="#" className="text-pink-600 font-medium hover:underline">
              CODESWEAR.COM
            </a>
          </div>
        </div>
      ) : <p className="text-center">Loading..</p>}
    </div>
  );
}

export default Order;
