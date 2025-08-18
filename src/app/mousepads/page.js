import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";
import connectToDB from "@/lib/connectDB";
import Product from "@/models/Product";

async function getData() {
  await connectToDB();
  try {
    let Mousepads = {};
    const products = await Product.find({ category: "Mousepads" });
    for (let item of products) {
      if (item.title in Mousepads) {
        if (
          !Mousepads[item.title].color.includes(item.color) &&
          item.avlQty > 0
        ) {
          Mousepads[item.title].color.push(item.color);
        }
        if (!Mousepads[item.title].size.includes(item.size) && item.avlQty > 0) {
          Mousepads[item.title].size.push(item.size);
        }
      } else {
        Mousepads[item.title] = JSON.parse(JSON.stringify(item));
        if (item.avlQty > 0) {
          Mousepads[item.title].color = [item.color];
          Mousepads[item.title].size = [item.size];
        }
      }
    }
    return Mousepads;
  } catch (err) {
    console.log("Error During Fetching Mousepads", err);
  }
}

async function Mousepads() {
  const products = await getData();
  return (
    <div className="container px-5 py-10 mx-auto">
      <div className="flex items-center">
        <button className="bg-pink-500 cursor-pointer text-white py-2 px-3 rounded">
          Filter <CiFilter className="inline" />
        </button>
      </div>

      <div className="mx-auto">
        <div className="flex flex-wrap md:p-10 md:space-x-10">
          {Object.keys(products).map((item) => {
            return (
              <div
                key={products[item]._id}
                className="lg:w-1/5 sm:w-1/4 p-4 w-full shadow-lg "
              >
                <Link href={`/products/${products[item].slug}`}>
                  <div>
                    <Image
                      src={products[item].img}
                      width={500}
                      height={10}
                      alt="Mousepads_image"
                      className="h-48 object-contain"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <div className="flex items-center justify-between">
                        <p className="mt-1">₹{products[item].price}</p>
                        {products[item].avlQty>0 ? <p>🟢In Stock</p>: <p>🔴Out of Stock</p>}
                      </div>
                    <div className="space-x-3 mt-2">
                      {products[item].size.includes("S") && <span className="border p-1">S</span>}
                      {products[item].size.includes("M") && <span className="border p-1">M</span>}
                      {products[item].size.includes("L") && <span className="border p-1">L</span>}
                      {products[item].size.includes("XL") && <span className="border p-1">XL</span>}
                      {products[item].size.includes("XXL") && <span className="border p-1">XXL</span>}
                    </div>
                    <div className="space-x-3 mt-2">
                      {products[item].color.includes("red") && <button className="border-2 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("black") && <button className="border-2 border-gray-300 bg-black ml-1  rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("pink") && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mousepads;
