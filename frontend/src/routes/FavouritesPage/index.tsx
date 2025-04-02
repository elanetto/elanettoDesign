import { useFavouritesStore } from "../../store/FavouritesStore";
import ProductCard from "../../components/ProductCard";

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavouritesStore();

  return (
    <div className="p-6 max-w-6xl mx-auto pb-4 mb-16">
      <h1 className="text-2xl font-bold mb-6">Your Favourites</h1>
      {favourites.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              mode="customer"
              onToggleFavourite={() => toggleFavourite(product)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">
          You haven't added any favourites yet!
        </p>
      )}
    </div>
  );
}
