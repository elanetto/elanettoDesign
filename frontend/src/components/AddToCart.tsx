import { Sticker } from "../types/sticker";
import { useCartStore } from "../store/CartStore";
import { FaTimes } from "react-icons/fa";

interface AddToCartProps {
  product: Sticker;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart, removeFromCart, itemIncrement, itemDecrement, cart } =
    useCartStore();

  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const quantityInCart = cartItem?.quantity || 0;
  const isMaxReached = quantityInCart >= product.stock_quantity;

  return (
    <div className="flex items-center gap-2">
      {!isInCart ? (
        <button
          className="bg-primary hover:bg-primary-hover px-4 py-2 text-white rounded-lg"
          onClick={() => {
            if (product.stock_quantity > 0) addToCart(product);
          }}
          disabled={product.stock_quantity === 0}
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => itemDecrement(product.id)}
            className="px-2 py-0.5 w-7 bg-white text-gray-800 rounded-lg hover:bg-gray-100 border shadow-sm flex justify-center items-center"
          >
            -
          </button>

          <span className="text-lg font-semibold">{quantityInCart}</span>

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

          <button
            className="text-gray-500 hover:text-gray-400 text-sm"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
