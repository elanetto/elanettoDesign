import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img
        src="/check_success.PNG"
        alt="Success"
        className="w-48 h-auto mb-6"
      />
      <h1 className="text-green-700 text-3xl font-bold mb-2">
        Checkout Success!
      </h1>
      <p className="text-gray-700 text-md mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to={isLoggedIn ? "/account" : "/login"}
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          {isLoggedIn ? "My Account" : "Log in"}
        </Link>
      </div>
    </div>
  );
}
