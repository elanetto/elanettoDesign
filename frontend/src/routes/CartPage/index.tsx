import { useCartStore } from "../../store/CartStore";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    const {
        cart,
        getTotalPrice,
    } = useCartStore();

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Shopping Cart</h2>

            {cart.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-2 gap-6">
                        {cart.map((item) => (
                            <ProductCard key={item.id} product={item} mode="checkout" />
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-right mt-6">
                        Grand Total: {getTotalPrice().toFixed(2)} kr
                    </h3>

                    <div className="flex justify-between mt-6">
                        <Link to="/" className="text-blue-600 hover:underline">
                            Back to Browse
                        </Link>
                        <Link to="/checkout/success" className="text-green-600 hover:underline">
                            Go to Checkout
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-600 text-lg">Your cart is empty.</p>
                    <Link className="mt-4 inline-block px-6 py-2 text-blue-600 hover:underline" to="/">
                        Back to Browse
                    </Link>
                </div>
            )}
        </div>
    );
}
