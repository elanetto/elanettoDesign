import { Sticker } from "../types/sticker";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type AdminProductCardProps = {
    product: Sticker;
    onEdit: () => void;
    onDelete: () => Promise<void>;
};

export default function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${product.title}"?`);
        if (!confirmDelete) return;

        await onDelete();
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 flex flex-col items-center">
            <div className="bg-pink-100 rounded-xl p-4 w-full flex justify-center">
                <img
                    src={product.images?.[0]?.image_url || "https://via.placeholder.com/150"}
                    alt={product.images?.[0]?.image_alt || "No Image Available"}
                    className="w-32 h-32 object-cover rounded-md"
                />
            </div>

            <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-sm">{product.category || "No category"}</p>
                <p className="text-red-500 text-xl font-bold mt-1">NOK {product.price}</p>
                <p className="text-gray-500 text-sm mt-1">
                    {product.stock_quantity} in stock | {product.sticker_type}
                </p>
            </div>

            <div className="flex justify-between w-full mt-4">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 border-2 border-blue-400 text-blue-500 px-4 py-1 rounded-lg text-sm hover:bg-blue-100 transition"
                >
                    <FaEdit />
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 border-2 border-red-400 text-red-500 px-4 py-1 rounded-lg text-sm hover:bg-red-100 transition"
                >
                    <FaTrashAlt />
                    Delete
                </button>
            </div>
        </div>
    );
}
