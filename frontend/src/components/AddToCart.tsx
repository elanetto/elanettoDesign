import { Sticker } from "../types/sticker";
import { useCartStore } from "../store/CartStore";

interface AddToCartProps {
  product: Sticker;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart, removeFromCart, itemIncrement, itemDecrement, cart } =
    useCartStore();

  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  return (
    <div className="flex items-center gap-2">
      {!isInCart ? (
        <button
          className="bg-primary px-4 py-2 text-white rounded-lg"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => itemDecrement(product.id)}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
          >
            -
          </button>

          <span className="text-lg font-semibold">{cartItem.quantity}</span>

          <button
            onClick={() => itemIncrement(product.id)}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
          >
            +
          </button>

          <button onClick={() => removeFromCart(product.id)}>remove</button>
        </div>
      )}
    </div>
  );
}
