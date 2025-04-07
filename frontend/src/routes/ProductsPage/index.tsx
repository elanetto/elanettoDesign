import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useStickerStore } from "../../store/stickerStore";
import { useFilteredStickers } from "../../store/useFilteredStickers";

export default function ProductsPage() {
  const filteredStickers = useFilteredStickers();
  const { setStickers, fetchStickers, loading, error } = useStickerStore();

  useEffect(() => {
    const cached = sessionStorage.getItem("stickers");

    if (cached && cached !== "undefined" && cached !== "") {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setStickers(parsed); // ✅ hydrate store with valid cached stickers
          return;
        }
      } catch (err) {
        console.warn("⚠️ Failed to parse cached stickers:", err);
      }
    }

    // 🧃 No valid cache? Fetch fresh!
    fetchStickers().then((fetched) => {
      if (Array.isArray(fetched)) {
        sessionStorage.setItem("stickers", JSON.stringify(fetched));
      }
    });
  }, [fetchStickers, setStickers]);

  return (
    <div className="w-full flex flex-col justify-center pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto items-start">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`loading-${i}`}
              className="h-72 w-full bg-gray-100 rounded-xl animate-pulse"
            />
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            Error loading products: {error}
          </div>
        ) : filteredStickers.length > 0 ? (
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
