import { Sticker } from "../types/sticker";
import { CartItem, useCartStore } from "../store/CartStore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AddToCart } from "./AddToCart";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavouritesStore } from "../store/FavouritesStore";

type ProductCardProps = {
  product: Sticker | CartItem;
  mode: "admin" | "customer" | "checkout";
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToCart?: () => void;
  onToggleFavourite?: () => void;
};

export default function ProductCard({
  product,
  mode,
  onEdit,
  onDelete,
  onToggleFavourite,
}: ProductCardProps) {
  const isCartItem = "quantity" in product;
  const { itemIncrement, itemDecrement, removeFromCart } = useCartStore();

  const firstImage =
    "images" in product &&
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images[0]
      : null;

  const image = firstImage?.image_url ?? "https://via.placeholder.com/150";
  const imageAlt = firstImage?.image_alt ?? "No Image Available";

  const price = product.discount > 0 ? product.discount : product.price;
  const total = isCartItem ? product.quantity * price : price;

  const { toggleFavourite, isFavourite } = useFavouritesStore();
  const hearted = isFavourite(product.id);

  const isMaxReached =
  isCartItem && typeof product.stock_quantity === "number"
    ? product.quantity >= product.stock_quantity
    : false;

  if (mode === "checkout" && isCartItem) {
    return (
      <div className="flex sm:flex-row items-center justify-between gap-4 border-b p-4 bg-white rounded-lg shadow-sm w-full">
        <div>
          <Link to={`/products/${product.id}`}>
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="w-20 h-20 object-cover rounded"
            />
          </Link>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-500 pb-2">
            {product.category || "No category"}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => itemDecrement(product.id)}
              className="px-2 py-0.5 w-7 bg-white text-gray-800 rounded-lg hover:bg-gray-100 border shadow-sm flex justify-center items-center"
            >
              -
            </button>
            <span className="text-lg font-semibold">{product.quantity}</span>
            {isMaxReached && (
              <p className="text-xs text-red-500 mt-1">Max stock reached</p>
            )}

            <button
              onClick={() => {
                if (!isMaxReached) itemIncrement(product.id);
              }}
              disabled={isMaxReached}
              className={`px-2 py-0.5 w-7 ${
                isMaxReached
                  ? "bg-gray-300 text-gray-500"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              } rounded-lg border shadow-sm flex justify-center items-center`}
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right ml-4">
          <p className="text-green-700 font-semibold">{total.toFixed(2)} kr</p>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-black hover:text-gray-800 text-lg pt-2"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center relative overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full">
      {mode === "customer" && !isCartItem ? (
        <>
          <Link to={`/products/${product.id}`} className="block w-full h-full">
            <div className="bg-secondary rounded-xl p-2 w-full flex justify-center overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy" // lazy-load images
                className="w-[190px] h-[190px] object-cover rounded-md group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-secondary-text text-sm">
                {product?.category_link?.category?.name ||
                  product.category ||
                  "No category"}
              </p>
              <p className="text-primary text-xl font-semibold mt-1">
                NOK {price}
              </p>
              <p className="text-secondary-text text-sm mt-1">
                {product.stock_quantity} in stock | {product.sticker_type}
              </p>
            </div>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onToggleFavourite) {
                onToggleFavourite();
              } else {
                toggleFavourite(product);
              }
            }}
            className="absolute top-6 right-7 text-xl text-primary z-10"
          >
            {hearted ? <FaHeart /> : <FaRegHeart />}
          </button>
        </>
      ) : (
        <>
          <div className="bg-secondary rounded-xl p-4 w-full flex justify-center overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy" // lazy-load images
              className="w-32 h-32 object-cover rounded-md group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-secondary-text text-sm">
              {product?.category_link?.category?.name ||
                product.category ||
                "No category"}
            </p>
            <p className="text-primary text-xl font-semibold mt-1">
              NOK {price}
            </p>
            <p className="text-secondary-text text-sm mt-1">
              {product.stock_quantity} in stock | {product.sticker_type}
            </p>
          </div>
        </>
      )}

      <div className="w-full mt-4 flex flex-col items-center gap-2">
        {mode === "admin" ? (
          <div className="flex justify-between w-full">
            <button
              onClick={() => onEdit?.()}
              className="flex items-center gap-2 border-2 border-accent text-accent px-4 py-1 rounded-lg text-sm hover:bg-blue-100 transition"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete this product? This cannot be undone."
                  )
                ) {
                  onDelete?.();
                }
              }}
              className="flex items-center gap-2 border-2 border-red-400 text-red-500 px-4 py-1 rounded-lg text-sm hover:bg-red-100 transition"
            >
              <FaTrashAlt />
              Delete
            </button>
          </div>
        ) : (
          mode !== "checkout" && <AddToCart product={product} />
        )}
      </div>
    </div>
  );
}
