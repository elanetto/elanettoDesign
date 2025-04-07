import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: number;
  name: string;
  image?: string;
  product_type: string; // dynamic type: sticker, bookmark, etc
}

export default function CategoryCard({
  id,
  name,
  image,
  product_type,
}: CategoryCardProps) {
  const fallbackImage = "/category_default.png";

  return (
    <Link to={`/category/${id}/${product_type}`} className="block group">
      <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <img
          src={image || fallbackImage}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
        <h3 className="text-center font-semibold mt-2 text-lg">{name}</h3>
      </div>
    </Link>
  );
}
