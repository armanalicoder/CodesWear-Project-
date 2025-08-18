"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { CircularProgress } from "@mui/material";

function Signup() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors,setError] = useState({})
  useEffect(() => {
    if (isLoggedIn) {
      toast.success("You have already logged in");
      router.push("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let errorObj = {}
  const validate = () => {
    // Name validation (only alphabets, min 3 chars)
    if (!formData.name.trim()) {
      errorObj.name="Name is Required!"
    } else if (!/^[A-Za-z\s]{3,}$/.test(formData.name)) {
      errorObj.name="Enter a valid name (min 3 letters)";
    }
    // Email validation
    if (!formData.email) {
     errorObj.email="Email is required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errorObj.email="Invalid email address";
    }

     // Password validation (min 6 chars, at least 1 number)
    if (!formData.password) {
      errorObj.password="Password is required"
    } else if (!/^(?=.*[0-9]).{6,}$/.test(formData.password)) {
      errorObj.password="Password must be at least 6 chars & include a number";
    }
    setError(errorObj)
    return Object.keys(errorObj).length===0;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if(validate()){
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.exist) {
        toast.error("You have already an account Please Login");
        router.push("/login");
      }
      if (data.Save) {
        toast.success("Signup Successfully Please Login");
        router.push("/login");
      }
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
          Signup to your account
        </h2>
        {loading && (
          <div className="my-2 flex justify-center">
            <CircularProgress style={{ color: "#cc0dd6" }} />
          </div>
        )}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium">
              Full Name
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                id="name"
                type="text"
                name="name"
                required
                autoComplete="email"
                placeholder="Enter Full Name"
                className="block w-full rounded-md px-3 py-1.5 text-base border "
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
          </div>
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
                type="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                placeholder="Enter Your Email Id"
                className="block w-full rounded-md px-3 py-1.5 text-base border "
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Create Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                value={formData.password}
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md px-3 py-1.5 text-base border "
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-pink-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              Signup
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account ?
          <Link
            href="/login"
            className="ms-3 font-semibold text-pink-400 hover:text-pink-300"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
