import { useState, useEffect, useCallback } from "react";
import { ADDRESS_URL } from "../../constants";
import { Address } from "../../types/Address";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface Props {
  onSuccess: () => void;
  editingAddress?: Address | null;
  onCancelEdit?: () => void;
  setExternalAddress?: (address: Address | null) => void;
  formSubmitted?: boolean;
}

export default function AddressForm({
  onSuccess,
  editingAddress,
  onCancelEdit,
  setExternalAddress,
  formSubmitted = false,
}: Props) {
  const [formData, setFormData] = useState<Address>({
    full_name: "",
    street_address: "",
    city: "",
    postal_code: "",
    country: "",
    phone_number: "",
    is_default: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const token = localStorage.getItem("token");
  const location = useLocation();
  const isCheckoutPage = location.pathname.includes("/checkout");

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

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (
      !/^([A-Za-zÆØÅæøå]+(?:-[A-Za-zÆØÅæøå]+)?)(\s+([A-Za-zÆØÅæøå]+(?:-[A-Za-zÆØÅæøå]+)?))+$/u.test(
        formData.full_name.trim()
      )
    ) {
      newErrors.full_name =
        "Please enter at least a first name and a last name. Hyphenated names are allowed.";
    }

    if (!/^[A-Za-zÆØÅæøå\s]{2,}\s+\d+/.test(formData.street_address.trim())) {
      newErrors.street_address = "Please enter a street name followed by a number.";
    }

    if (formData.city.trim().length < 2) {
      newErrors.city = "Please enter your City";
    }

    if (!/^[0-9]{4,}$/.test(formData.postal_code)) {
      newErrors.postal_code = "Postal code must be at least 4 digits.";
    }

    if (formData.country.trim().length < 2) {
      newErrors.country = "Please enter your Country";
    }

    if (
      formData.phone_number &&
      formData.phone_number.trim() !== "" &&
      !/^(\+?47|0047)?\s?\d{3}\s?\d{2}\s?\d{3}$/.test(formData.phone_number.trim())
    ) {
      newErrors.phone_number =
        "Phone number must be a valid Norwegian number (e.g. 123 45 678 or +47 12345678).";
    }

    return newErrors;
  }, [formData]);

  useEffect(() => {
    if (isCheckoutPage && setExternalAddress) {
      const validationErrors = validateForm();

      const filteredErrors: typeof validationErrors = {};
      Object.entries(validationErrors).forEach(([key, message]) => {
        if (formSubmitted || touchedFields[key]) {
          filteredErrors[key] = message;
        }
      });
      setErrors(filteredErrors);

      const isValid = Object.keys(validationErrors).length === 0;
      if (isValid) {
        setExternalAddress(formData);
      } else {
        setExternalAddress(null);
      }
    }
  }, [formData, isCheckoutPage, setExternalAddress, validateForm, formSubmitted, touchedFields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    if (!token) {
      if (setExternalAddress) {
        setExternalAddress(formData);
      }
      onSuccess();
      return;
    }

    try {
      const method = editingAddress ? "PUT" : "POST";
      const url = editingAddress ? `${ADDRESS_URL}/${editingAddress.id}` : ADDRESS_URL;

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

      if (setExternalAddress) setExternalAddress(formData);
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error("Failed to save address.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-white shadow">
      <h3 className="text-lg font-semibold">
        {editingAddress ? "Edit Address" : "Add New Address"}
      </h3>

      <p className="text-sm text-gray-500">
        <span className="text-red-500">*</span> Required fields
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.full_name ? "border-red-500" : ""}`}
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.phone_number ? "border-red-500" : ""}`}
          />
          {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="street_address"
            placeholder="Street Address"
            value={formData.street_address}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.street_address ? "border-red-500" : ""}`}
          />
          {errors.street_address && <p className="text-red-500 text-sm mt-1">{errors.street_address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.city ? "border-red-500" : ""}`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.postal_code ? "border-red-500" : ""}`}
          />
          {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className={`border p-2 rounded w-full ${errors.country ? "border-red-500" : ""}`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>

      {token ? (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
          />
          Set as default address
        </label>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Want to save your address for next time?{" "}
          <a href="/login" className="text-blue-600 underline">
            Log in
          </a>
          .
        </p>
      )}

      {!isCheckoutPage && (
        <div className="flex gap-2">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
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
      )}
    </form>
  );
}
