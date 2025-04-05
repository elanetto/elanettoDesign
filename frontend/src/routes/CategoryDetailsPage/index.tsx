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
  const params = useParams();
  const categoryId = params.categoryId;
  const product_type = params.product_type;

  const [products, setProducts] = useState<Sticker[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}/${product_type}`);
        const data = await res.json();
  
        if (!data || !data.product_ids) {
          console.warn("⚠️ No product_ids found");
          setProducts([]);
          setCategoryName("Unknown");
          return;
        }

        if (!categoryId || !product_type) {
          console.warn("Missing categoryId or product_type!");
          return;
        }        
  
        setCategoryName(data.category);
  
        const productData = await Promise.all(
          data.product_ids.map(async (id: number) => {
            const productRes = await fetch(`${BASE_URL}/${product_type}s/${id}`);
            const productJson = await productRes.json();
            return productJson;
          })
        );
  
        setProducts(productData);
      } catch (error) {
        console.error("❌ Failed to fetch products in category:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (categoryId && product_type) {
      fetchCategoryProducts();
    }
  }, [categoryId, product_type]);
  
  // Add category as title to tab + Add specific META for this page
  useEffect(() => {
    if (categoryName) {
      const title = `${categoryName} ${product_type === "sticker" ? "Stickers" : "Products"} | elanetto Design`;
      document.title = title;
  
      const updateMetaTag = (nameOrProp: string, content: string, isProperty = false) => {
        const selector = isProperty ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
        let element = document.head.querySelector(selector);
  
        if (!element) {
          element = document.createElement("meta");
          if (isProperty) {
            element.setAttribute("property", nameOrProp);
          } else {
            element.setAttribute("name", nameOrProp);
          }
          document.head.appendChild(element);
        }
  
        element.setAttribute("content", content);
      };
  
      const imageUrl = categoryImages[categoryName] || categoryImages["Default"];
  
      updateMetaTag("description", `Explore all our ${categoryName.toLowerCase()} ${product_type}s! Cute, fun, and handmade just for you.`);
      updateMetaTag("og:title", title, true);
      updateMetaTag("og:description", `Explore all our ${categoryName.toLowerCase()} ${product_type}s!`);
      updateMetaTag("og:image", imageUrl, true);
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:image", imageUrl);
      updateMetaTag("keywords", `${categoryName}, stickers, ${product_type}, cute, handmade, elanetto`);
    }
  }, [categoryName, product_type]);  

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Products in category: <span className="text-accent">{categoryName}</span>
      </h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found in this category 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
          {products.map((product) => (
            <ProductCard key={`${product_type}-${product.id}`} product={product} mode="customer" />
          ))}
        </div>
      )}
    </section>
  );
}
