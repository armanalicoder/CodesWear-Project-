"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { redirect, useRouter } from "next/navigation";
function MyAccount() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formPassword, setFormPassword] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const fetchMyData = async () => {
    const res = await fetch(`/api/myaccount/${user?.id}`);
    const data = await res.json();
    if (data.success) {
      setFormData(data.address);
    } else {
      toast.error(data.message);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/myaccount/updateuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, data: formData }),
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        router.push("/myaccount");
      } else {
        setLoading(false);
        toast.error(data.message);
        router.push("/myaccount");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (formPassword.newpassword == formPassword.confirmpassword) {
        const res = await fetch("/api/myaccount/updateuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: formPassword, email: user?.email }),
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          window.location.href = process.env.NEXT_PUBLIC_HOST;
        } else {
          toast.error(data.message);
        }
        // setLoading(false);
        // if (data.success) {
        //   setLoading(false);
        //   toast.success(data.message);
        //   router.push("/myaccount");
        // } else {
        //   setLoading(false);
        //   toast.error(data.message);
        //   router.push("/myaccount");
        // }
      } else {
        toast.error("Confirm password not match");
        router.push("/myaccount");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyData();
    } else {
      toast.error("You are not Logged in.");
      router.push("/");
    }
  }, []);
  return (
    <>
      {user ? (
        <div>
          <h1 className="text-center text-3xl my-3 font-semibold">
            Update Your Account
          </h1>
          {loading && (
            <div className="my-2 flex justify-center">
              <CircularProgress />
            </div>
          )}
          <h1 className="font-semibold text-2xl my-2">1. Delivery Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2 text-black">
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData?.name}
                  type="text"
                  id="fullname"
                  className=" border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Email*(Can't Update)
                </label>
                <input
                  value={user?.email}
                  type="email"
                  id="email"
                  className="border border-gray-300 bg-slate-200  text-sm rounded-lg block w-full p-2.5  "
                  placeholder="Enter Email id "
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium "
                >
                  Phone number
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  value={formData?.number}
                  type="number"
                  id="phone"
                  className="border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                  placeholder="9999999999"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium "
                >
                  Address
                </label>
                <textarea
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  value={formData?.address}
                  placeholder="Enter Address"
                  required
                  className="border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium "
                >
                  Pincode
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                  value={formData?.pincode}
                  type="number"
                  id="pincode"
                  maxLength={6}
                  className="border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
                  placeholder="Enter Pincode"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium "
                >
                  City
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  value={formData?.city}
                  type="text"
                  id="city"
                  className="border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
                  placeholder="Enter City"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  State
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  value={formData?.state}
                  type="text"
                  id="state"
                  className="border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Enter State Name"
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                className={`${
                  loading ? "bg-pink-300" : "bg-pink-500"
                } p-2 rounded cursor-pointer text-white`}
              >
                Update Details
              </button>
            </div>
          </form>

          <div className="my-5">
            <h1 className="text-2xl font-semibold my-2">2. Change Password</h1>
            <form onSubmit={handlePasswordForm}>
              <div className="flex flex-col md:flex md:flex-row gap-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium"
                  >
                    Old Password
                  </label>
                  {/* <span className="text-sm">
              <Link
                href="/forgot"
                className="font-semibold text-pink-400 hover:text-pink-300"
              >
                Forgot password?
              </Link>
            </span> */}
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          oldpassword: e.target.value,
                        })
                      }
                      id="password"
                      type="password"
                      placeholder="Old Password"
                      name="password"
                      required
                      autoComplete="current-password"
                      className="w-full  rounded-md px-3 py-1.5 text-base border border-gray-300 "
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-sm/6 font-medium">
                    New Password
                  </label>
                  {/* <span className="text-sm">
              <Link
                href="/forgot"
                className="font-semibold text-pink-400 hover:text-pink-300"
              >
                Forgot password?
              </Link>
            </span> */}
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          newpassword: e.target.value,
                        })
                      }
                      id="password"
                      type="password"
                      placeholder="New Password"
                      name="password"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-md px-3 py-1.5 text-base border border-gray-300 "
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm/6 font-medium">
                    Confirm Password
                  </label>
                  {/* <span className="text-sm">
              <Link
                href="/forgot"
                className="font-semibold text-pink-400 hover:text-pink-300"
              >
                Forgot password?
              </Link>
            </span> */}
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          confirmpassword: e.target.value,
                        })
                      }
                      id="password"
                      type="password"
                      placeholder="Confirm Password"
                      name="password"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-md px-3 py-1.5 text-base border border-gray-300 "
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  disabled={loading}
                  className={`${
                    loading ? "bg-pink-300" : "bg-pink-500"
                  } p-2 rounded text-white`}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="my-2 flex justify-center">
          <CircularProgress style={{color : "#cc0dd6"}} />
        </div>
      )}
    </>
  );
}

export default MyAccount;
