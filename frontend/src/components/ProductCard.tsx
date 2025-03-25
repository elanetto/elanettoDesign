import { Sticker } from "../types/sticker";
import { CartItem, useCartStore } from "../store/CartStore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AddToCart } from "./AddToCart";

type ProductCardProps = {
    product: Sticker | CartItem;
    mode: "admin" | "customer" | "checkout";
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function ProductCard({
                                        product,
                                        mode,
                                        onEdit,
                                        onDelete,
                                    }: ProductCardProps) {
    const isCartItem = "quantity" in product;

    const { itemIncrement, itemDecrement, removeFromCart } = useCartStore();

    const image =
        product.images?.length > 0
            ? product.images[0].image_url
            : "https://via.placeholder.com/150";
    const imageAlt =
        product.images?.length > 0
            ? product.images[0].image_alt
            : "No Image Available";

    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 flex flex-col items-center">
            <div className="bg-pink-100 rounded-xl p-4 w-full flex justify-center">
                <img
                    src={image}
                    alt={imageAlt}
                    className="w-32 h-32 object-cover rounded-md"
                />
            </div>
            <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-secondary-text text-sm">{product.category || "No category"}</p>
                <p className="text-primary text-xl font-semibold mt-1">
                    NOK {product.discount > 0 ? product.discount : product.price}
                </p>
                <p className="text-secondary-text text-sm mt-1">
                    {product.stock_quantity} in stock | {product.sticker_type}
                </p>
            </div>

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
                            onClick={() => onDelete?.()}
                            className="flex items-center gap-2 border-2 border-red-400 text-red-500 px-4 py-1 rounded-lg text-sm hover:bg-red-100 transition"
                        >
                            <FaTrashAlt />
                            Delete
                        </button>
                    </div>
                ) : mode === "checkout" && isCartItem ? (
                    <>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => itemDecrement(product.id)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{product.quantity}</span>
                            <button
                                onClick={() => itemIncrement(product.id)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-sm font-medium text-green-700">
                            Total: {(product.quantity * (product.discount > 0 ? product.discount : product.price)).toFixed(2)} kr
                        </p>
                        <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-red-500 mt-2 hover:underline"
                        >
                            Remove
                        </button>
                    </>
                ) : (
                    <AddToCart product={product} />
                )}
            </div>
        </div>
    );
}
