import {SiFacebook, SiInstagram, SiX} from "react-icons/si";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bottom-0 w-full bg-gray-900 text-gray-400 text-center py-6 mt-8">
            <div className="flex justify-center space-x-8 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <SiFacebook className="w-6 h-6 hover:text-blue-500"/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <SiInstagram className="w-6 h-6 hover:text-pink-500"/>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <SiX className="w-6 h-6 hover:text-blue-400"/>
                </a>
            </div>
            <p className="text-xs mt-2">&copy; {currentYear} Elanetto Sticker store</p>
        </footer>
    );
}
