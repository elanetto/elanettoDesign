import { useCartStore } from "../../store/CartStore";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCartStore();

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg rounded-lg mt-4 mb-16 bg-white">
      {/* ^ reason for padding bottom 16 is to make the nav bar not overlap the checkout button at mobile screen */}
      <h2 className="text-2xl font-bold text-center mb-6">Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <ProductCard key={item.id} product={item} mode="checkout" />
            ))}
          </div>

          <h3 className="text-xl font-bold text-right mt-6">
            Grand Total: {getTotalPrice().toFixed(2)} kr
          </h3>

          <div className="flex justify-between mt-6">
            <Link
              to="/"
              className="text-blue-600 hover:underline flex flex-row items-center gap-2"
            >
              <FaArrowLeft /> Back to Browse
            </Link>
            <Link
              to="/checkout/success"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Go to Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="text-blue-600 hover:underline flex flex-row items-center justify-center pr-2 mt-4 gap-2"
          >
            <FaArrowLeft /> Back to Browse
          </Link>
        </div>
      )}
    </div>
  );
}
