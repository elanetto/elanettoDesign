import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logout from "../../utilities/logout"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();
  const user = (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page.");
    }
  }, [user]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={user?.avatar || "https://placehold.co/100x100?text=Avatar"}
                alt="Avatar"
                className="w-24 h-24 rounded-full border"
              />
              <div className="text-center sm:text-left">
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">(Avatar upload functionality coming soon!)</p>
            <button
              onClick={() => logout(navigate)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        );
      case "Pending Orders":
        return <p>Pending Orders section coming soon...</p>;
      case "Order History":
        return <p>Order History section coming soon...</p>;
      case "Address":
        return <p>Address section coming soon...</p>;
      case "Payment":
        return <p>Payment section coming soon...</p>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Account</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[
          "Profile",
          "Pending Orders",
          "Order History",
          "Address",
          "Payment",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded text-sm sm:text-base transition ${
              activeTab === tab ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render tab content here */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};
