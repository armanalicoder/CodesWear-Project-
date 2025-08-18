"use client";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ResetPassword({searchParams}) {
  const router = useRouter();
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.token;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/resetpassword", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
      setLoading(false);
      setNewPassword("");
      const data = await res.json();
      alert(data.message || data.error);
      window.location.href = process.env.NEXT_PUBLIC_HOST;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!user) {
      toast.error("you are not logged in");
      router.push("/");
    }
  }, [user]);
  return (
    <>
      {user && (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2">Reset Password</h2>
          {loading && (
            <div className="my-2 flex justify-center">
              <CircularProgress style={{ color: "#cc0dd6" }} />
            </div>
          )}
          <input
            type="password"
            placeholder="Enter new password"
            className="border p-2 w-full mb-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="bg-pink-500 cursor-pointer rounded-md text-white px-4 py-2">
            Reset Password
          </button>
        </form>
      )}
    </>
  );
}
