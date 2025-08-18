"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { CircularProgress } from "@mui/material";
function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You are logged in.");
      router.push("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.isValid) {
        setIsLoggedIn(true);
        setFormData({
          email: "",
          password: "",
        });
        router.push("/")
        window.location.href=process.env.NEXT_PUBLIC_HOST;
      } else {
        toast.error("Incorrect email or password!");
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/logo.png"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-center text-2xl/9 font-bold">
          Login to your account
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
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                id="email"
                value={formData.email}
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/forgot"
                  className="font-semibold text-pink-400 hover:text-pink-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md px-3 py-1.5 text-base border "
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?
          <Link
            href="/signup"
            className="ms-3 font-semibold text-pink-400 hover:text-pink-300"
          >
            Signup Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
