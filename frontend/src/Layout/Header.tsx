import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { useCartStore } from "../store/CartStore";
import { useFavouritesStore } from "../store/FavouritesStore";

export default function Header() {
  const { getTotalItems } = useCartStore();
  const favouritesCount = useFavouritesStore(
    (state) => state.favourites.length
  );
  const token = localStorage.getItem("token");

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-lg font-semibold text-primary">
          ElanettoDesign
        </span>
      </Link>

      <nav>
        <ul className="flex space-x-6 text-black text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-all ${
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `transition-all ${
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }`
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <FaSearch className="primary-text cursor-pointer hover:text-secondary-text" />

        <Link to="/favourites" className="relative">
          <FaHeart className="primary-text cursor-pointer hover:text-secondary-text" />
          {favouritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {favouritesCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <FaShoppingCart className="primary-text cursor-pointer hover:text-secondary-text" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {getTotalItems()}
            </span>
          )}
        </Link>

        <Link to={token ? "/account" : "/login"}>
          <FaUser className="primary-text cursor-pointer hover:text-secondary-text" />
        </Link>
      </div>
    </header>
  );
}
