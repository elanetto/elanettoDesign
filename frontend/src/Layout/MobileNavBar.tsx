import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingBag, FaHeart, FaUser } from "react-icons/fa";

export default function MobileNavbar() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-3">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex flex-col items-center text-sm ${
                        isActive ? "text-primary font-semibold" : "text-gray-500"
                    }`
                }
            >
                <FaHome size={22} />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/products"
                className={({ isActive }) =>
                    `flex flex-col items-center text-sm ${
                        isActive ? "text-primary" : "text-gray-500"
                    }`
                }
            >
                <FaShoppingBag size={22} />
                <span>Shop</span>
            </NavLink>

            <NavLink
                to="/favourites"
                className={({ isActive }) =>
                    `flex flex-col items-center text-sm ${
                        isActive ? "text-primary font-semibold" : "text-gray-500"
                    }`
                }
            >
                <FaHeart size={22} />
                <span>Favorites</span>
            </NavLink>

            <NavLink
                to="/profile/exampleUser"
                className={({ isActive }) =>
                    `flex flex-col items-center text-sm ${
                        isActive ? "text-primary font-semibold" : "text-gray-500"
                    }`
                }
            >
                <FaUser size={22} />
                <span>Account</span>
            </NavLink>
        </nav>
    );
}
