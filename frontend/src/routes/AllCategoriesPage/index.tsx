import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard";
import { BASE_URL } from "../../constants";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  // Add more mappings here
};

export default function AllCategoriesPage() {
  const { product_type } = useParams(); // <-- get type from URL
  const [categories, setCategories] = useState<Category[]>([]);
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

      fetchCategories();
    }, []);
    
      return (
        <section className="p-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                name={cat.name}
                image={categoryImages[cat.name] || undefined}
                product_type={product_type || "sticker"} // fallback
              />
            ))}
          </div>
          <Outlet />
        </section>
      );
}
