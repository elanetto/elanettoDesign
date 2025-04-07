import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../utilities/logout";
import AddressForm from "../../components/account/AddressForm";
import AddressList from "../../components/account/AddressList";
import { Address } from "../../types/Address";
import { useStickerStore } from "../../store/stickerStore";
import { useFetchStickers } from "../../hooks/useFetchStickers";
import { Sticker } from "../../types/sticker";
import { Search } from "../../components/Search";
import ProductCard from "../../components/ProductCard";
import { ErrorMessage } from "../../utilities/errorMessage";
import { Loading } from "../../utilities/loading";

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("Profile");
    const [refresh, setRefresh] = useState(false);
    const [editing, setEditing] = useState<Address | null>(null);
    const [searchResults, setSearchResults] = useState<Sticker[]>([]);
    const navigate = useNavigate();

    const user = (() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    })();

    const isAdmin = user?.role === "admin";

    const { stickers, loading, error, deleteSticker } = useFetchStickers();
    const { searchQuery } = useStickerStore();

    useEffect(() => {
        if (!user) {
          toast.error("You must be logged in to view this page.");
          setTimeout(() => {
            navigate("/login");
          }, 1500); // Wait 1.5 seconds before redirecting
        }
    }, [user, navigate]);          

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults(stickers);
        } else {
            const filtered = stickers.filter((sticker) =>
                sticker.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        }
    }, [searchQuery, stickers]);

    useEffect(() => {
        if (!isAdmin && activeTab === "Manage Products") {
            setActiveTab("Profile");
        }
    }, [isAdmin, activeTab]);

    const handleDelete = async (productId: number) => {
        await deleteSticker(productId);
    };

    const handleEdit = (productId: number) => {
        navigate(`/update/${productId}`);
    };

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
                                <p>
                                    <strong>Username:</strong> {user?.username}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user?.email}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            (Avatar upload functionality coming soon!)
                        </p>
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
                return (
                    <div className="space-y-6">
                        <AddressForm
                            onSuccess={() => setRefresh(!refresh)}
                            editingAddress={editing}
                            onCancelEdit={() => setEditing(null)}
                        />
                        <AddressList
                            refreshTrigger={refresh}
                            onEdit={(addr) => setEditing(addr)}
                        />
                    </div>
                );

            case "Payment":
                return <p>Payment section coming soon...</p>;

            case "Manage Products":
                if (loading) return <Loading />;
                if (error) return <ErrorMessage message={error} />;

                return (
                    <>
                        <div className="flex flex-col w-full justify-center items-center my-4 gap-4">
                            <Search />
                            <Link
                                to="/add-new-product"
                                className="px-4 py-2 w-fit rounded text-sm sm:text-base text-white bg-primary hover:bg-primary-hover transition"
                            >
                                + Add New Product
                            </Link>
                        </div>
                        <div className="w-full flex">
                            <div className="grid gap-6 p-6 mx-auto mb-20 md:grid-cols-2 lg:grid-cols-3">
                                {searchResults.length > 0 ? (
                                    searchResults.map((sticker) => (
                                        <ProductCard
                                            key={sticker.id}
                                            product={sticker}
                                            mode="admin"
                                            onEdit={() => handleEdit(sticker.id)}
                                            onDelete={() => handleDelete(sticker.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        No results found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    const tabs = [
        "Profile",
        "Pending Orders",
        "Order History",
        "Address",
        "Payment",
    ];

    if (isAdmin) {
        tabs.push("Manage Products");
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">My Account</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tabs.map((tab) => (
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

            <div className="mt-6 min-h-screen sm:min-h-[70vh]">{renderTabContent()}</div>
        </div>
    );
}