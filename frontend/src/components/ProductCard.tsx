import { Sticker } from "../types/sticker";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { AddToCart } from "./AddToCart";

type ProductCardProps = {

    product: Sticker;

    mode: "admin" | "customer";

    onEdit?: () => void;

    onDelete?: () => void;

};

export default function ProductCard({

                                        product,

                                        mode,

                                        onEdit,

                                        onDelete,

                                    }: ProductCardProps) {

    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 flex flex-col items-center">
            <div className="bg-pink-100 rounded-xl p-4 w-full flex justify-center">
                <img

                    src={

                        product.images?.length > 0

                            ? product.images[0].image_url

                            : "https://via.placeholder.com/150"

                    }

                    alt={

                        product.images?.length > 0

                            ? product.images[0].image_alt

                            : "No Image Available"

                    }

                    className="w-32 h-32 object-cover rounded-md"

                />
            </div>
            <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-secondary-text text-sm">

                    {product.category || "No category"}
                </p>
                <p className="text-primary text-xl font-semibold mt-1">

                    NOK {product.price}
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

                ) : (
                    <AddToCart product={product} />

                )}
            </div>
        </div>

    );

}

