import ProductCard from "../../components/ProductCard";
import { useStickerStore } from "../../store/stickerStore";
import { useEffect } from "react";
import { Loading } from "../../utilities/loading";
import { ErrorMessage } from "../../utilities/errorMessage";

export default function ProductsPage() {
  const { stickers, searchQuery, fetchStickers, loading, error } =
    useStickerStore();

  useEffect(() => {
    fetchStickers();
  }, [fetchStickers]);

  const filtered = stickers.filter((sticker) =>
    sticker.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="w-full flex justify-center pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto items-start">
        {filtered.length > 0 ? (
          filtered.map((sticker) => (
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

// import ProductCard from "../../components/ProductCard";
// import { useFetchStickers } from "../../hooks/useFetchStickers";
// import { Loading } from "../../utilities/loading";
// import { ErrorMessage } from "../../utilities/errorMessage";

// import { Search } from "../../components/Search";
// import { useState, useEffect } from "react";
// import { Sticker } from "../../types/sticker";

// export default function ShopPage() {
//   const { stickers, loading, error } = useFetchStickers();
//   const [searchResults, setSearchResults] = useState<Sticker[]>([]);

//   useEffect(() => {
//     setSearchResults(stickers);
//   }, [stickers]);

//   if (loading) return <Loading />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <>
//       <div className="flex w-full justify-center m-4">
//         <Search setResults={setSearchResults} />
//       </div>
//       <div className="w-full flex justify-center pb-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto items-start">
//           {searchResults.length > 0 ? (
//             searchResults.map((sticker) => (
//               <ProductCard key={sticker.id} product={sticker} mode="customer" />
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-500">
//               No results found.
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
