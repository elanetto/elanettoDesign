import { Link, useLocation } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  savings: number;
  total: string;
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  savings,
  total,
}: OrderSummaryProps) {
  const { pathname } = useLocation();

  let buttonText = "";
  let buttonLink = "";
  let showButton = true;

  if (pathname === "/cart") {
    buttonText = "Proceed to Checkout"; //proceed to checkout button only on cart page
    buttonLink = "/checkout";
  } else if (pathname === "/checkout") {
    buttonText = `Pay ${total} kr`; //this will be for the "pay page" checkoutPage. the buttons text change to "pay..."
    buttonLink = "/CheckoutSuccessPage";
  } else {
    showButton = false; // On user account page or elsewhere, the button will be hidden. for user to only view past orders etc.
  }

  return (
    <div className="w-full lg:w-1/3 rounded-lg p-4 shadow-sm h-fit bg-white">
      <h2 className="text-lg font-semibold mb-4 text-center">Order Summary</h2>

      <div className="flex justify-between mb-2 text-sm text-gray-700">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} kr</span>
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

      {showButton && (
        <Link
          to={buttonLink}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md w-full flex justify-center"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

//example code for the checkoutPage:

// import { useCartStore } from "../../store/CartStore";
// import OrderSummary from "../../components/OrderSummary";

// export default function CheckoutPage() {
//   const { getTotalPrice, cart } = useCartStore();

//   const shipping = 4.99;
//   const tax = 2.5;
//   const subtotal = getTotalPrice();
//   const total = (subtotal + shipping + tax).toFixed(2);

//   const savings = cart.reduce((acc, item) => {
//     if (item.discount && item.discount > 0) {
//       const savedPerItem = item.price - item.discount;
//       acc += savedPerItem * item.quantity;
//     }
//     return acc;
//   }, 0);

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
//       <OrderSummary
//         subtotal={subtotal}
//         shipping={shipping}
//         tax={tax}
//         savings={savings}
//         total={total}
//         page="pay" // this is the important bit where it will say pay
//       />
//     </div>
//   );
// }
