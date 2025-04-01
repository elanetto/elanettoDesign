import { useState, useEffect } from "react";
import { ADDRESS_URL } from "../../constants";
import { Address } from "../../types/Address";
import { toast } from "react-hot-toast";

interface Props {
  onSuccess: () => void;
  editingAddress?: Address | null;
  onCancelEdit?: () => void;
}

export default function AddressForm({ onSuccess, editingAddress, onCancelEdit }: Props) {
  const [formData, setFormData] = useState<Address>({
    full_name: "",
    street_address: "",
    city: "",
    postal_code: "",
    country: "",
    phone_number: "",
    is_default: false,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editingAddress) {
      setFormData(editingAddress);
    }
  }, [editingAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingAddress ? "PUT" : "POST";
      const url = editingAddress
            ? `${ADDRESS_URL}/${editingAddress.id}`
            : ADDRESS_URL;


      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save address");

      toast.success(editingAddress ? "Address updated!" : "Address saved!");

      onSuccess();

      setFormData({
        full_name: "",
        street_address: "",
        city: "",
        postal_code: "",
        country: "",
        phone_number: "",
        is_default: false,
      });

      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error("Failed to save address.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded bg-white shadow"
    >
      <h3 className="text-lg font-semibold">
        {editingAddress ? "Edit Address" : "Add New Address"}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="street_address"
          placeholder="Street Address"
          value={formData.street_address}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={formData.postal_code}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_default"
          checked={formData.is_default}
          onChange={handleChange}
        />
        Set as default address
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {editingAddress ? "Update" : "Save"}
        </button>
        {editingAddress && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-gray-500 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
