import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = `404 | elanetto Design`;
  }, []); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
        >
          Continue Shopping
        </Link>

        <Link
          to={token ? "/account" : "/login"}
          className="border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-100 transition"
        >
          {token ? "My Account" : "Log In"}
        </Link>
      </div>
    </div>
  );
}
