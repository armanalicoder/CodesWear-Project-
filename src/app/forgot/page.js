"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      setEmail("")
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You have already logged in");
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/logo.png"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-center text-2xl/9 font-bold">
          Forgot your password
        </h2>
        {loading && (
          <div className="my-2 flex justify-center">
            <CircularProgress style={{ color: "#cc0dd6" }} />
          </div>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter Your Email Id"
                className="block w-full rounded-md px-3 py-1.5 text-base border "
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              Continue
            </button>
          </div>
        </form>
        <p className="mt-2 text-center font-bold">Or</p>
        <p className="text-center text-sm/6 text-gray-400">
          <Link
            href="/login"
            className="ms-3 font-semibold text-pink-400 hover:text-pink-300"
          >
            Login to Your Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Forgot;
