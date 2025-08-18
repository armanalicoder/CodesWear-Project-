"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "@/Components/CheckoutButton";
import { useAuth } from "@/context/authContext";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function Checkout() {
  const router = useRouter();
  const { user } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const [city, setCity] = useState(null);
  const [State, setState] = useState(null);
  const { cart, addToCart, removeItemFromCart, subTotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    city: city,
    state: State,
    pincode: "",
  });
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/myaccount/${user?.id}`);
        const data = await res.json();
        if (data.success) {
          setFormData(data.address);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchPincodeData = async () => {
      if (formData.pincode.length == 6) {
         console.log("Pincode render");
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${formData.pincode}`
          );
          const data = await res.json();
          if (data[0].Status == "Success") {
            setCity(data[0].PostOffice[0].District);
            setState(data[0].PostOffice[0].State);
            setFormData((prev) => ({
              ...prev,
              city: data[0].PostOffice[0].District,
              state: data[0].PostOffice[0].State,
            }));
          } else {
            window.alert("Invalid Pincode!");
            setFormData({
              name: "",
              email: user?.email,
              number: "",
              address: "",
              city: "",
              state: "",
              pincode: "",
            });
          }
        } catch (err) {
          console.error(err);
        }
        
      }
    };
    const { name, number, address, pincode } = formData;
    if (name && email && number && address && pincode) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if(formData.pincode.length==6){
    fetchPincodeData();
    }
  }, [formData.pincode]);
  return (
    <>
      {user ? (
        <div>
          <h1 className="text-center text-3xl my-3 font-semibold">Checkout</h1>
          <h1 className="text-center text-xl my-3 font-semibold">
            Enter Your Delivery Address
          </h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2 text-black">
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                Email
              </label>
              <input
                value={user.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                id="email"
                className="border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
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
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                type="number"
                id="phone"
                className="border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                placeholder="9999999999"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
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
                value={formData.pincode}
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    setFormData({ ...formData, pincode: e.target.value });
                  }
                  if (e.target.value.length > 6) {
                    window.alert("Pincode length is 6 ");
                  }
                }}
                type="number"
                id="pincode"
                maxLength={6}
                className="border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
                placeholder="Enter Pincode"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium ">
                City
              </label>
              <input
                value={city != null ? city : ""}
                type="text"
                id="city"
                className="border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
                placeholder="Enter City"
                readOnly
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
                value={State != null ? State : ""}
                type="text"
                id="state"
                className="border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                placeholder="Enter State Name"
                readOnly
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-center">
              Review Items & Pay
            </h1>
            {Object.keys(cart).length == 0 && (
              <p className="text-red-500 text-center font-bold">
                Your cart is empty!
              </p>
            )}
            {Object.keys(cart).map((item) => {
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
                      {cart[item].name}({cart[item].size}/{cart[item].color})
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
            <div>
              <p className="font-bold">SubTotal : ₹{subTotal}</p>
            </div>
          </div>
          {/* {console.log(purchasedItem)} */}
          <CheckoutButton
            amount={subTotal}
            user={user}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            formData={formData}
          />
        </div>
      ) : (
        <div className="my-2 flex justify-center">
          <CircularProgress style={{ color: "#cc0dd6" }} />
        </div>
      )}
    </>
  );
}

export default Checkout;
