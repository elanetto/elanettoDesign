import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingBag, FaHeart, FaUser } from "react-icons/fa";

export default function MobileNavbar() {
  const user = localStorage.getItem("user");

  return (
    <nav className="sticky bottom-0 left-0 w-full bg-white shadow-md border-t flex z-[9999] justify-around py-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? "text-primary font-semibold" : "text-black"
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
            isActive ? "text-primary font-semibold" : "text-black"
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
            isActive ? "text-primary font-semibold" : "text-black"
          }`
        }
      >
        <FaHeart size={22} />
        <span>Favorites</span>
      </NavLink>

      <NavLink
        to={user ? "/account" : "/login"}
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? "text-primary font-semibold" : "text-black"
          }`
        }
      >
        <FaUser size={22} />
        <span>Account</span>
      </NavLink>
    </nav>
  );
}
