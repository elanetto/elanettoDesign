import { FaSearch, FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useCartStore} from "../store/CartStore";

export default function MobileHeader() {
    const {cart} = useCartStore();
    const cartCount = cart.length;
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-lg font-semibold text-primary">ElanettoDesign</h1>

            <div className="flex items-center gap-4">
                <button className="text-black hover:text-gray-600">
                    <FaSearch size={18} />
                </button>

                <div className="relative">
                    <Link className="text-black hover:text-gray-600"
                    to="/cart">
                        <FaShoppingCart size={20} />
                    </Link>
                    {cartCount > 0 && (
                        <span
                            className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
                        >
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
