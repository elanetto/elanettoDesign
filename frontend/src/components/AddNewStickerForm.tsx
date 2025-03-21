import { useState } from "react";
import {BASE_URL} from "../constants";

export default function AddStickerForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        sticker_type: "single",
        stock_quantity: 1,
        price: "",
        discount: "",
        height: "",
        width: "",
        images: [{ image_url: "", image_alt: "" }]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index: number, field: "image_url" | "image_alt", value: string) => {
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

        const stickerData = {
            ...formData,
            stock_quantity: Number(formData.stock_quantity),
            price: parseFloat(formData.price).toFixed(2),
            discount: parseFloat(formData.discount).toFixed(2),
            height: parseFloat(formData.height).toFixed(2),
            width: parseFloat(formData.width).toFixed(2),
            images: formData.images.filter(img => img.image_url.trim() !== "")
        };

        try {
            const response = await fetch(`${BASE_URL}/stickers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stickerData),
            });

            if (!response.ok) {
                throw new Error(`Failed to add sticker: ${response.status}`);
            }

            alert("Sticker added successfully!");
            setFormData({
                title: "",
                description: "",
                category: "",
                sticker_type: "single",
                stock_quantity: 1,
                price: "",
                discount: "",
                height: "",
                width: "",
                images: [{ image_url: "", image_alt: "" }]
            });
        } catch (error) {
            console.error("Error adding sticker:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
            <label className="block font-medium">Product Name</label>
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
                <option value="Gaming">Gaming</option>
                <option value="Nature">Nature</option>
                <option value="Cartoon">Cartoon</option>
                <option value="Animals">Animals</option>
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
                placeholder="Price"
                required
            />

            <label className="block font-medium mt-4">Discount</label>
            <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Discount"
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
                        placeholder="Height"
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
                        placeholder="Width"
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
                Add Sticker
            </button>
        </form>
    );
}
