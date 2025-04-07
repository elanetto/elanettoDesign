import { useEffect, useState } from "react";
import { ADDRESS_URL, USER_ADDRESSES_URL } from "../../constants";
import { toast } from "react-hot-toast";
import { Address } from "../../types/Address";

interface Props {
  onEdit: (address: Address) => void;
  refreshTrigger: boolean;
}

export default function AddressList({ onEdit, refreshTrigger }: Props) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const res = await fetch(USER_ADDRESSES_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch addresses");
  
        const data = await res.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
  
    fetchAddresses();
  }, [refreshTrigger]);  

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const res = await fetch(`${ADDRESS_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");

      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success("Address deleted");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      const res = await fetch(`${ADDRESS_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_default: true }),
      });

      if (!res.ok) throw new Error("Failed to set default");

      // Re-fetch updated addresses
      const updated = await fetch(USER_ADDRESSES_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await updated.json();
      setAddresses(data);
      toast.success("Default address updated");
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to set as default");
    }
  };

  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses saved yet.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded p-4 shadow-sm ${
              address.is_default ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{address.full_name}</p>
                <p>{address.street_address}</p>
                <p>
                  {address.postal_code} {address.city}
                </p>
                <p>{address.country}</p>
                {address.phone_number && <p>{address.phone_number}</p>}
                {address.is_default && (
                  <p className="text-sm text-red-500 mt-1">Default address</p>
                )}
              </div>
              <div className="flex flex-col gap-1 items-end">
                <button
                  className="text-blue-500 text-sm underline"
                  onClick={() => onEdit(address)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 text-sm underline"
                  onClick={() => handleDelete(address.id!)}
                >
                  Delete
                </button>
                {!address.is_default && (
                  <button
                    className="text-green-600 text-sm underline"
                    onClick={() => handleSetDefault(address.id!)}
                  >
                    Set as default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
