import { useCartStore } from "../../store/CartStore";
import { useState, useEffect } from "react";
import AddressForm from "../../components/account/AddressForm";
import { Address } from "../../types/Address";
import { USER_ADDRESSES_URL } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState<{ address?: string; payment?: string }>({});
  const [manualAddress, setManualAddress] = useState<Address | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const shipping = 31;
  const tax = 5;
  const subtotal = getTotalPrice();
  const total = (subtotal + shipping + tax).toFixed(2);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchAddresses = async () => {
      const res = await fetch(USER_ADDRESSES_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
        const defaultAddress = data.find((a: Address) => a.is_default);
        if (defaultAddress) setSelectedAddressId(defaultAddress.id);
      }
    };
    fetchAddresses();
  }, [token]);

  useEffect(() => {
    if (orderConfirmed && cart.length === 0) {
      navigate("/checkout-success");
    }
  }, [orderConfirmed, cart.length, navigate]);

  useEffect(() => {
    document.title = `Checkout | elanetto Design`;
  }, []);

  const validateManualAddress = (address: Address | null): boolean => {
    if (!address) return false;
    return (
      /^([A-Za-zÆØÅæøå]+(?:-[A-Za-zÆØÅæøå]+)?)(\s+([A-Za-zÆØÅæøå]+(?:-[A-Za-zÆØÅæøå]+)?))+$/u.test(
        address.full_name.trim()
      ) &&
      /^[A-Za-zÆØÅæøå\s]{2,}\s+\d+/.test(address.street_address.trim()) &&
      address.city.trim().length >= 2 &&
      /^[0-9]{4,}$/.test(address.postal_code) &&
      address.country.trim().length >= 2
    );
  };

  const handlePlaceOrder = () => {
    setFormSubmitted(true); // ✅ Trigger validation display in AddressForm

    const newErrors: { address?: string; payment?: string } = {};

    const addressIsMissing =
      (!token && (!manualAddress || !validateManualAddress(manualAddress))) ||
      (token && addresses.length > 0 && !selectedAddressId);

    if (addressIsMissing) {
      newErrors.address = "Please fill in or select an address before proceeding.";
    }

    if (!paymentMethod) {
      newErrors.payment = "Please select a payment method.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    clearCart();
    setOrderConfirmed(true);
  };

  const savings = cart.reduce((acc, item) => {
    if (item.discount && item.discount > 0) {
      const savedPerItem = item.price - item.discount;
      acc += savedPerItem * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 space-y-6">
          {token && addresses.length > 0 && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Select Address</h2>
              <div className="space-y-2">
                {addresses.map((addr) => (
                  <label key={addr.id} className="block border p-3 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => addr.id !== undefined && setSelectedAddressId(addr.id)}
                      className="mr-2"
                    />
                    <span>
                      {addr.full_name}, {addr.street_address}, {addr.postal_code} {addr.city}, {addr.country}
                    </span>
                  </label>
                ))}
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">{errors.address}</p>
              )}
              <button
                className="text-sm text-blue-500 mt-2 underline"
                onClick={() => setShowAddressForm(true)}
              >
                Add New Address
              </button>
            </div>
          )}

          {!token || showAddressForm ? (
            <>
              <AddressForm
                onSuccess={() => setShowAddressForm(false)}
                setExternalAddress={setManualAddress}
                formSubmitted={formSubmitted} // ✅ pass to trigger error display
              />
              {!token && (
                <p className="text-sm text-gray-600 mt-2">
                  Want to save your address?{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Log in
                  </Link>
                  .
                </p>
              )}
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">{errors.address}</p>
              )}
            </>
          ) : null}

          {/* Payment Method */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="klarna">Klarna</option>
            </select>
            {errors.payment && (
              <p className="text-red-500 text-sm mt-2">{errors.payment}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">(This is a dummy checkout form)</p>
          </div>
        </div>

        {/* Right column - Order Summary */}
        <div className="w-full lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            savings={savings}
            total={total}
            showButton={false}
          />

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary hover:bg-red-600 text-white py-3 rounded-lg font-semibold mt-4"
          >
            Pay {total} kr
          </button>

          <Link
            to="/cart"
            className="text-blue-600 underline text-sm text-center block mt-2"
          >
            Edit Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
