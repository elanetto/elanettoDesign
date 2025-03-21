import { useEffect } from "react";
import { Loading } from "../../utilities/loading";
import { ErrorMessage } from "../../utilities/errorMessage";
import { useStickerStore } from "../../store/stickerStore";
import AdminProductCard from "../../components/AdminProductCard";

export default function AdminPage() {
    const { stickers, loading, error, fetchStickers, deleteSticker } = useStickerStore(); // ✅ Using Zustand deleteSticker

    useEffect(() => {
        fetchStickers();
    },[fetchStickers]);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;


    const handleDelete = async (stickerId: number) => {
        await deleteSticker(stickerId);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="grid gap-6 p-6 mx-auto">
                {stickers.map((sticker) => (
                    <AdminProductCard
                        key={sticker.id}
                        product={sticker}
                        onEdit={() => console.log("Edit", sticker.id)}
                        onDelete={() => handleDelete(sticker.id)} // ✅ No need for extra filtering
                    />
                ))}
            </div>
        </div>
    );
}
