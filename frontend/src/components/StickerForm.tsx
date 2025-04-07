import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStickerStore } from "../store/stickerStore";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
// import { Sticker } from "../types/sticker";

export default function StickerForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { specificSticker, fetchSpecificSticker, updateSticker } = useStickerStore();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    sticker_type: "single",
    product_type: "sticker",
    stock_quantity: 1,
    price: "",
    discount: "",
    height: "",
    width: "",
    images: [{ image_url: "", image_alt: "" }],
  });

  useEffect(() => {
    if (productId) {
      fetchSpecificSticker(productId);
    }
  }, [productId, fetchSpecificSticker]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (specificSticker && productId) {
      setFormData({
        title: specificSticker.title ?? "",
        description: specificSticker.description ?? "",
        category: specificSticker.category ?? "",
        sticker_type: specificSticker.sticker_type ?? "single",
        product_type: "sticker",
        stock_quantity: specificSticker.stock_quantity ?? 1,
        price: String(specificSticker.price ?? ""),
        discount: String(specificSticker.discount ?? ""),
        height: String(specificSticker.height ?? ""),
        width: String(specificSticker.width ?? ""),
        images: Array.isArray(specificSticker.images)
          ? specificSticker.images.map((img) => ({
              image_url: img.image_url || "",
              image_alt: img.image_alt || "",
            }))
          : [{ image_url: "", image_alt: "" }],
      });
    }
  }, [specificSticker, productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (
    index: number,
    field: "image_url" | "image_alt",
    value: string
  ) => {
    const updatedImages = [...formData.images];
    updatedImages[index][field] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, { image_url: "", image_alt: "" }] });
  };

  const removeImageField = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stickerDataToSend = {
      title: formData.title,
      description: formData.description,
      stock_quantity: Number(formData.stock_quantity),
      price: parseFloat(formData.price) || 0,
      discount: parseFloat(formData.discount) || 0,
      height: parseFloat(formData.height) || 0,
      width: parseFloat(formData.width) || 0,
      sticker_type: formData.sticker_type as "single" | "sheet",
      product_type: formData.product_type,
      images: formData.images.map((img, index) => ({
        image_url: img.image_url,
        image_alt: img.image_alt,
        is_primary: index === 0,
      })),
    };

    try {
      const categoryId = Number(formData.category);

      if (!categoryId) {
        toast.error("Category not found. Please select a valid category.");
        return;
      }

      let createdStickerId = Number(productId);

      if (productId) {
        await updateSticker(productId, stickerDataToSend);
        toast.success("Sticker updated successfully!");
      } else {
        const response = await fetch(`${BASE_URL}/stickers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stickerDataToSend),
        });

        if (!response.ok) {
          throw new Error(`Failed to add sticker: ${response.status}`);
        }

        const created = await response.json();
        createdStickerId = created.id;
        toast.success("Sticker added successfully!");
      }

      const assignRes = await fetch(`${BASE_URL}/categories/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: createdStickerId,
          category_id: categoryId,
          product_type: "sticker",
        }),
      });

      const assignData = await assignRes.json();

      if (!assignRes.ok && assignData?.error?.includes("already assigned")) {
        console.warn("Category already assigned, skipping...");
      } else if (!assignRes.ok) {
        throw new Error(`Failed to assign category: ${assignRes.status}`);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error submitting sticker:", error);
      toast.error("Failed to submit sticker.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-lg font-semibold">{productId ? "Edit Sticker" : "Add New Sticker"}</h2>

      <label className="block font-medium mt-4">Product Name</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        placeholder="Product name"
        required
      />

      <label className="block font-medium mt-4">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        placeholder="Product description"
        required
      />

      <label className="block font-medium mt-4">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label className="block font-medium mt-4">Sticker Type</label>
      <select
        name="sticker_type"
        value={formData.sticker_type}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        required
      >
        <option value="single">Single</option>
        <option value="sheet">Sheet</option>
      </select>

      <label className="block font-medium mt-4">Stock Quantity</label>
      <input
        type="number"
        name="stock_quantity"
        value={formData.stock_quantity}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        min="1"
        required
      />

      <label className="block font-medium mt-4">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
        required
      />

      <label className="block font-medium mt-4">Discount</label>
      <input
        type="number"
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        className="w-full border p-2 rounded-md mt-1"
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block font-medium">Height</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border p-2 rounded-md mt-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Width</label>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="w-full border p-2 rounded-md mt-1"
            required
          />
        </div>
      </div>

      <label className="block font-medium mt-4">Image URLs</label>
      {formData.images.map((image, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={image.image_url}
            onChange={(e) => handleImageChange(index, "image_url", e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Image URL"
          />
          <input
            type="text"
            value={image.image_alt}
            onChange={(e) => handleImageChange(index, "image_alt", e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Image Alt Text"
          />
          {index > 0 && (
            <button type="button" onClick={() => removeImageField(index)} className="text-red-500">
              ✖
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addImageField} className="mt-2 text-blue-500">
        + Add More Images
      </button>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {formData.images.map((image, index) =>
          image.image_url ? (
            <img
              key={index}
              src={image.image_url}
              alt={image.image_alt || "Preview"}
              className="w-full h-20 object-cover rounded-md border"
            />
          ) : null
        )}
      </div>

      <button type="submit" className="w-full bg-red-400 text-white py-2 mt-4 rounded-lg">
        {productId ? "Update Sticker" : "Add Sticker"}
      </button>
    </form>
  );
}
