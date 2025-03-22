import {useCartStore} from "../store/cartStore";
import {Sticker} from "../types/sticker.ts";

interface AddToCartProps {
    product: Sticker;
}

export function AddToCart({product}: AddToCartProps) {
    const {addToCart, removeFromCart, incrementCart, decrementCart, cart} = useCartStore();

    const cartItem = cart.find((item) => item.id === product.id);
    const isInCart = !!cartItem;

    return (
        <div className="flex items-center gap-2">
            {!isInCart ? (
                <button
                    onClick={() => addToCart(product)}
                >
                    add to cart
                </button>
            ) : (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => decrementCart(product.id)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                    >
                        -
                    </button>

                    <span className="text-lg font-semibold">{cartItem.quantity}</span>

                    <button
                        onClick={() => incrementCart(product.id)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                    >
                        +
                    </button>

                    <button
                        onClick={() => removeFromCart(product.id)}
                    >
                        remove
                    </button>
                </div>
            )}
        </div>
    );
}

