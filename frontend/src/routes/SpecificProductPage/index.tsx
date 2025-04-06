import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { Sticker } from "../../types/sticker";
import { AddToCart } from "../../components/AddToCart";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useFavouritesStore } from "../../store/FavouritesStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Sticker | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const hearted = product ? isFavourite(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      const cached = sessionStorage.getItem(`product-${productId}`);
      if (cached && cached !== "undefined" && cached !== "") {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.id) {
            setProduct(parsed);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("⚠️ Failed to parse cached product:", err);
        }
      }

      try {
        const response = await axios.get(`${BASE_URL}/stickers/${productId}`);
        setProduct(response.data);
        sessionStorage.setItem(`product-${productId}`, JSON.stringify(response.data));
      } catch {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | elanetto Design`;

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

      const firstImage = product.images?.[0];
      const imageAlt = firstImage?.image_alt ?? "";

      updateMetaTag("description", product.description ?? "");
      updateMetaTag("og:title", `${product.title} | elanetto Design`, true);
      updateMetaTag("og:description", product.description ?? "", true);
      updateMetaTag("og:image", firstImage?.image_url || "https://via.placeholder.com/600", true);
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:image", firstImage?.image_url || "https://via.placeholder.com/600");
      updateMetaTag("keywords", `${imageAlt}, stickers, elanetto, cute, fun`);
    }
  }, [product]);

  if (loading) {
    return (
      <main className="min-h-[80vh]">
        <div className="max-w-4xl mx-auto p-4 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="bg-gray-200 h-72 rounded-xl w-full lg:w-1/2" />
            <div className="space-y-4 flex-1">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!product) return null;

  const images = Array.isArray(product.images) ? product.images : [];
  const hasMultipleImages = images.length > 1;
  const image =
    images[currentImageIndex]?.image_url || "https://via.placeholder.com/300";
  const imageAlt = images[currentImageIndex]?.image_alt || "No Image";

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-[80vh]">
      <div className="max-w-4xl mx-auto p-4 pb-28">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {/* Image Section */}
          <div className="relative flex-1">
            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow z-10"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 shadow z-10"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
            <img
              src={image}
              alt={imageAlt}
              className="w-full rounded-xl cursor-pointer object-contain transition-opacity duration-300"
              onClick={() => setIsZoomed(true)}
            />
            <p className="text-center mt-2 text-gray-600 text-sm">{imageAlt}</p>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 space-y-4 self-center relative">
            <button
              onClick={() => toggleFavourite(product)}
              className="absolute top-0 right-0 text-2xl text-primary"
            >
              {hearted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <h1 className="text-2xl font-bold text-primary">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-sm text-gray-500">
              <p>Category: {product.category || "N/A"}</p>
              <p>
                Size: {product.width} cm x {product.height} cm
              </p>
              <p>Type: {product.sticker_type}</p>
              <p>Stock: {product.stock_quantity}</p>
            </div>
            <p className="text-2xl font-semibold text-primary">
              NOK {product.discount > 0 ? product.discount : product.price}
            </p>

            <AddToCart product={product} />
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-xl max-w-2xl w-full">
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-2 right-2 text-black hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
              <img src={image} alt={imageAlt} className="w-full h-auto rounded" />
              <p className="text-center mt-2 text-sm text-gray-700">{imageAlt}</p>
            </div>
          </div>
        )}

        {/* Extra Info Section */}
        <div className="mt-10 text-sm text-gray-700 leading-relaxed bg-pink-50 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-primary mb-2">
            Handmade with Love
          </h2>
          <p>
            All products are illustrated by Anette using Procreate on her iPad.
            After illustration, each item is carefully printed using an Epson
            printer for vivid, long-lasting colors, and then cut using a
            Silhouette Cameo 4 cutting machine to ensure precision.
          </p>
          <p className="mt-2">
            Please note that colors may vary slightly from what you see on screen
            due to monitor settings, and the final product may differ slightly
            from the preview.
          </p>
        </div>
      </div>
    </main>
  );
}