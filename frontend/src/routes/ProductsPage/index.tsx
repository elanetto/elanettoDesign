import ProductCard from "../../components/ProductCard";
import { useStickerStore } from "../../store/stickerStore";
import { useEffect } from "react";
import { Loading } from "../../utilities/loading";
import { ErrorMessage } from "../../utilities/errorMessage";
import { useFilteredStickers } from "../../store/useFilteredStickers"; 

export default function ProductsPage() {
  const filteredStickers = useFilteredStickers(); 
  const { fetchStickers, loading, error } = useStickerStore();

  useEffect(() => {
    fetchStickers();
  }, [fetchStickers]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="w-full flex justify-center pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto items-start">
        {filteredStickers.length > 0 ? (
          filteredStickers.map((sticker) => (
            <ProductCard key={sticker.id} product={sticker} mode="customer" />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
