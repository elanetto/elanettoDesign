import { useEffect, useRef, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { MobileSearch } from "../components/MobileSearch";

export default function MobileHeader() {
  const { cart } = useCartStore();
  const cartCount = cart.length;

  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md relative">
      <Link to="/" className="text-lg font-bold">
        <h1 className="text-lg font-semibold text-primary">ElanettoDesign</h1>
      </Link>

      <div className="flex items-center gap-4">
        <button
          className="text-black hover:text-secondary-text"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch size={18} />
        </button>

        <div className="relative">
          <Link className="text-black hover:text-secondary-text" to="/cart">
            <FaShoppingCart size={20} />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 right-0 p-4 bg-white shadow z-10" ref={searchRef}>
          <MobileSearch setShowSearch={setShowSearch} />

        </div>
      )}
    </header>
  );
}
