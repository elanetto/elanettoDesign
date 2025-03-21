import ProductCard from "../../components/ProductCard";
import {useFetchStickers} from "../../utilities/useFetchStickers";
import {Loading} from "../../utilities/loading";
import {ErrorMessage} from "../../utilities/errorMessage";

export default function ShopPage() {
    const { stickers, loading, error } = useFetchStickers();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    const addToCart = (stickerId: number) => {
        console.log(`Adding sticker ${stickerId} to cart`);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="grid gap-6 p-6 mx-auto">
                {stickers.map((sticker) => (
                    <ProductCard
                        key={sticker.id}
                        product={sticker}
                        mode="customer"
                        onAddToCart={() => addToCart(sticker.id)}
                    />
                ))}
            </div>
        </div>
    );
}
