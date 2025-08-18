import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-pink-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
