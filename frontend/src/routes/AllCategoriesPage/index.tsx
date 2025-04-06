import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard";
import { BASE_URL } from "../../constants";
import { Outlet, useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

const categoryImages: Record<string, string> = {
  Cute: "/cute_category.png",
  Plants: "/plants_category.png",
  Geeky: "/geeky_category.png",
  Funny: "/funny_category.png",
  Journaling: "/journaling_category.png",
};

export default function AllCategoriesPage() {
  const { product_type } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const cached = sessionStorage.getItem("categories");
      if (cached) {
        setCategories(JSON.parse(cached));
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
        sessionStorage.setItem("categories", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to load categories", err);
        setError("Oops! Could not load categories.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);  

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="aspect-square bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 transition-opacity duration-500 opacity-100">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              image={categoryImages[cat.name] || undefined}
              product_type={product_type || "sticker"}
            />
          ))}
        </div>
      )}

      <Outlet />
    </section>
  );
}
