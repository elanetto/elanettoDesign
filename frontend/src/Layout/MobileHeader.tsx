import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { useFavouritesStore } from "../store/FavouritesStore";

export default function MobileHeader() {
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  const favouritesCount = useFavouritesStore(
    (state) => state.favourites.length
  );

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md relative">
      <Link to="/" className="text-lg font-bold">
        <h1 className="text-lg font-semibold text-primary">ElanettoDesign</h1>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/favourites" className="relative">
          <FaHeart size={20} className="text-black hover:text-secondary-text" />
          {favouritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {favouritesCount}
            </span>
          )}
        </Link>

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
    </header>
  );
}
