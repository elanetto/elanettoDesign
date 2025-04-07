import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import ProductCard from "../../components/ProductCard";
import { Sticker } from "../../types/sticker";

const categoryImages: Record<string, string> = {
  Cute: "/cute_category.png",
  Plants: "/plants_category.png",
  Geeky: "/geeky_category.png",
  Funny: "/funny_category.png",
  Journaling: "/journaling_category.png",
  Default: "/category_default.png",
};

export default function CategoryDetailsPage() {
  const { categoryId, product_type } = useParams();
  const [products, setProducts] = useState<Sticker[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheKey = `category-${categoryId}-${product_type}`;
    const cached = sessionStorage.getItem(cacheKey);

    const fetchFullCategory = async () => {
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setProducts(parsed.products || []);
          setCategoryName(parsed.category || "Unknown");
          setIsLoading(false);
          return;
        } catch (err) {
          console.warn("⚠️ Failed to parse cached category products:", err);
        }
      }

      try {
        const response = await fetch(`${BASE_URL}/categories/${categoryId}/${product_type}?fullData=true`);
        if (!response.ok) throw new Error("Failed to fetch full category data");
        const data = await response.json();

        setProducts(data.products || []);
        setCategoryName(data.category || "Unknown");
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (err) {
        console.error("❌ Error fetching category products:", err);
        setProducts([]);
        setCategoryName("Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId && product_type) {
      fetchFullCategory();
    }
  }, [categoryId, product_type]);

  // ✅ Dynamic meta + <title>
  useEffect(() => {
    if (!categoryName) return;

    const title = `${categoryName} ${product_type === "sticker" ? "Stickers" : "Products"} | elanetto Design`;
    document.title = title;

    const updateMetaTag = (nameOrProp: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        if (isProperty) element.setAttribute("property", nameOrProp);
        else element.setAttribute("name", nameOrProp);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const imageUrl = categoryImages[categoryName] || categoryImages["Default"];

    updateMetaTag("description", `Explore all our ${categoryName.toLowerCase()} ${product_type}s! Cute, fun, and handmade just for you.`);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", `Explore all our ${categoryName.toLowerCase()} ${product_type}s!`, true);
    updateMetaTag("og:image", imageUrl, true);
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:image", imageUrl);
    updateMetaTag("keywords", `${categoryName}, stickers, ${product_type}, cute, handmade, elanetto`);
  }, [categoryName, product_type]);

  return (
    <main className="min-h-[80vh] flex flex-col">
      <section className="p-6 max-w-6xl mx-auto flex-grow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Products in category: <span className="text-accent">{categoryName}</span>
        </h1>

        {isLoading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found in this category 😭</p>
        ) : (
          <div className="w-full flex justify-center pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mx-auto items-start">
              {products.map((product) =>
                product?.title && Array.isArray(product.images) && product.images.length > 0 ? (
                  <ProductCard
                    key={`${product_type}-${product.id}`}
                    product={product}
                    mode="customer"
                  />
                ) : (
                  <div
                    key={`placeholder-${product.id}`}
                    className="bg-gray-100 rounded-xl h-72 animate-pulse"
                  />
                )
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
