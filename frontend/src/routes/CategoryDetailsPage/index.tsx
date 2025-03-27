import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import ProductCard from "../../components/ProductCard";
import { Sticker } from "../../types/sticker"; 

export default function CategoryDetailsPage() {
  const { name } = useParams(); // this is the category name like "Cute"
  const [products, setProducts] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const types = ["sticker", "bookmark", "bundle"];

        const allProductIds = await Promise.all(
          types.map(async (type) => {
            const res = await fetch(`${BASE_URL}/categories/${name}/${type}`)
            const data = await res.json();
            return data.product_ids?.map((id: number) => ({ id, type })) || [];
          })
        );

        const flattened = allProductIds.flat();

        // Fetch product data in parallel
        const productData = await Promise.all(
          flattened.map(async ({ id, type }) => {
            const res = await fetch(`${BASE_URL}/${type}s/${id}`);
            const data = await res.json();
            return data;
          })
        );

        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch products in category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchCategoryProducts();
    }
  }, [name]);

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Products in category: <span className="text-accent">{name}</span>
      </h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found in this category 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={`${product.id}-${product.title}`} product={product} mode="customer" />
          ))}
        </div>
      )}
    </section>
  );
}
