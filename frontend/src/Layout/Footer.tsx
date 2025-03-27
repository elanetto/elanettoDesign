import { useState } from "react";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import { BASE_URL } from "../constants";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!name || !email) {
            setMessage("Please fill in both fields.");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Thanks for subscribing! 🎉");
                setName("");
                setEmail("");
            } else {
                setMessage(data.message || "Something went wrong.");
            }
        } catch (err) {
            console.error("Newsletter error:", err);
            setMessage("Could not subscribe. Please try again.");
        }
    };

    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <h2 className="text-lg font-semibold">About Elanetto</h2>
                    <p className="text-sm text-gray-400 mt-2">
                        Creating cute and quality stickers for all your decorating needs since 2025.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Quick Links</h2>
                    <ul className="mt-2 space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">Shop All</a></li>
                        <li><a href="#" className="hover:text-primary">Custom Orders</a></li>
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Support</h2>
                    <ul className="mt-2 space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">FAQ</a></li>
                        <li><a href="#" className="hover:text-primary">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-primary">Returns</a></li>
                        <li><a href="#" className="hover:text-primary">Track Order</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Newsletter</h2>
                    <p className="text-sm text-gray-400 mt-2">
                        Subscribe for updates and exclusive offers!
                    </p>
                    <form onSubmit={handleSubscribe} className="mt-3 space-y-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your first name"
                            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm"
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white rounded py-2 text-sm hover:bg-red-500 transition"
                        >
                            Subscribe
                        </button>
                        {message && (
                            <p className="text-sm text-gray-300 mt-2">{message}</p>
                        )}
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>© 2025 Elanetto. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-primary"><FaInstagram /></a>
                    <a href="#" className="hover:text-primary"><FaFacebookF /></a>
                    <a href="#" className="hover:text-primary"><FaPinterest /></a>
                </div>
            </div>
        </footer>
    );
}
