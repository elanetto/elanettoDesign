import { FaBell } from "react-icons/fa";
import { useState } from "react";

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-xl">
            <h1 className="text-2xl font-semibold text-red-500">ElanettoDesign</h1>

            <div className="flex items-center gap-4">
                <FaBell className="text-black text-xl cursor-pointer" />

                <div className="relative">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">Profile</button>
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">Settings</button>
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
