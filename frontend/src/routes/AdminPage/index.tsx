import {Loading} from "../../utilities/loading";
import {ErrorMessage} from "../../utilities/errorMessage";
import {useFetchStickers} from "../../hooks/useFetchStickers";
import ProductCard from "../../components/ProductCard";

export default function AdminPage() {
    const {stickers, loading, error, deleteSticker} = useFetchStickers();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;


    const handleDelete = async (stickerId: number) => {
        await deleteSticker(stickerId);
    };

    return (
        <div className="w-full flex">
            <div className="grid gap-6 p-6 mx-auto mb-20">
                {stickers.map((sticker) => (
                    <ProductCard
                        key={sticker.id}
                        product={sticker}
                        mode="admin"
                        onEdit={() => console.log("Edit", sticker.id)}
                        onDelete={() => handleDelete(sticker.id)}
                    />
                ))}
            </div>
        </div>
    );
}
