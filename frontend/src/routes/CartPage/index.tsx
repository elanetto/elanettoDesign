import { useCartStore } from "../../store/CartStore";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import OrderSummary from "../../components/OrderSummary";

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCartStore();

  const shipping = 4.99;
  const tax = 2.5;

  const subtotal = getTotalPrice();
  const total = (subtotal + shipping + tax).toFixed(2);

  const savings = cart.reduce((acc, item) => {
    if (item.discount && item.discount > 0) {
      const savedPerItem = item.price - item.discount;
      acc += savedPerItem * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-md">
        {cart.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Shopping Cart (
              {cart.reduce((acc, item) => acc + item.quantity, 0)} items)
            </h1>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                {cart.map((item) => (
                  <ProductCard key={item.id} product={item} mode="checkout" />
                ))}
              </div>

              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                savings={savings}
                total={total}
              />
            </div>

            <div className="flex justify-between mt-6">
              <Link
                to="/"
                className="text-blue-600 hover:underline flex flex-row items-center gap-2"
              >
                <FaArrowLeft /> Back to Browse
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
    </div>
  );
}
