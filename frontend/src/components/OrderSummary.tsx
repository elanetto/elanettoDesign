import { Link, useLocation } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  savings: number;
  total: string;
  showButton?: boolean;
  onConfirmOrder?: () => void;
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  savings,
  total,
  showButton = true,
  onConfirmOrder,
}: OrderSummaryProps) {
  const { pathname } = useLocation();

  const isCheckoutPage = pathname === "/checkout";
  const isCartPage = pathname === "/cart";

  return (
    <div className="w-full rounded-lg p-6 shadow-sm bg-white space-y-3">
      <h2 className="text-lg font-semibold mb-4 text-center">Order Summary</h2>

      <div className="flex justify-between items-center mb-2 text-sm text-gray-700 w-full">
        <span className="flex-1">Subtotal</span>
        <span className="text-right">{subtotal.toFixed(2)} kr</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-gray-700">
        <span>Shipping</span>
        <span>{shipping.toFixed(2)} kr</span>
      </div>
      <div className="flex justify-between mb-2 text-sm text-gray-700">
        <span>Tax</span>
        <span>{tax.toFixed(2)} kr</span>
      </div>

      {savings > 0 && (
        <div className="flex justify-between mb-2 text-sm text-green-600 font-medium">
          <span>Savings</span>
          <span>-{savings.toFixed(2)} kr</span>
        </div>
      )}

      <hr className="my-2" />

      <div className="flex justify-between font-bold text-base mb-4">
        <span>Total</span>
        <span>{total} kr</span>
      </div>

      {/* 🧼 This logic is now clean and ESLint-approved! */}
      {showButton && (
        <>
          {isCheckoutPage && onConfirmOrder ? (
            <button
              onClick={onConfirmOrder}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md w-full flex justify-center"
            >
              Pay {total} kr
            </button>
          ) : isCartPage ? (
            <Link
              to="/checkout"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md w-full flex justify-center"
            >
              Proceed to Checkout
            </Link>
          ) : null}
        </>
      )}
    </div>
  );
}
