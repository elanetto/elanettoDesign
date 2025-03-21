import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    <p className="text-sm text-gray-400 mt-2">Subscribe for updates and exclusive offers!</p>
                    <div className="flex items-center mt-3 bg-gray-800 p-2 rounded-full">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent flex-1 text-sm px-3 text-white focus:outline-none placeholder-gray-500"
                        />
                    </div>
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
