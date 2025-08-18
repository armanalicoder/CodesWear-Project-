"use client";

import Script from "next/script";
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function CheckoutButton({
  amount,
  user,
  isDisabled,
  setIsDisabled,
  formData,
}) {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const startPayment = async () => {
    try {
      setLoading(true);
      const slug = Object.keys(cart);
      // 1) Create order on server
      toast.success("Dont Refresh the page We are creating your order");
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });

      const { success, message, order, orderProducts } = await orderRes.json();
      if (success) {
        setLoading(false)
        // Open Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order?.amount, // in paise
          currency: order?.currency,
          name: "Codeswear",
          description: `Order ${order.receipt}`,
          order_id: order.id,
          prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
            contact: user?.phone || "9999999999",
          },
          theme: { color: "#ec4899" },
          handler: async function (response) {
            // 3) Verify payment on server
            toast.success(
              "Don't Refresh the page we are verifying the payment"
            );
            setLoading(true)
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            console.log(verifyData);
            if (verifyData.success) {
              await fetch("/api/razorpay/save-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: formData.email,
                  orderId: order.id,
                  products: orderProducts,
                  address: formData,
                  amount: order?.amount / 100, //in rupees
                  status: "paid",
                  paymentId: verifyData.payment_id,
                }),
              });
              toast.success("Payment Done ! Wait Redirecting...");
              setLoading(false)
              window.location.href = `/order?order_id=${order.id}`;
            } else {
              alert("Payment verification failed");
            }
          },
          modal: {
            ondismiss: () => setLoading(false),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      {loading && (
        <div className="fixed bg-[rgba(0,0,0,0.2)] h-screen w-screen left-0 top-0 flex flex-col justify-center items-center">
          <CircularProgress style={{ color: "#cc0dd6" }} />
        </div>
      )}

      <button
        onClick={startPayment}
        disabled={isDisabled}
        className={`bg-pink-600 text-white px-4 cursor-pointer py-2 rounded disabled:bg-pink-300`}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </>
  );
}
