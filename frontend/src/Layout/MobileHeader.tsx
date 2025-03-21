import { FaSearch, FaShoppingCart } from "react-icons/fa";

type MobileHeaderProps = {
    cartItemCount: number;
};

export default function MobileHeader({ cartItemCount }: MobileHeaderProps) {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-lg font-semibold text-primary">ElanettoDesign</h1>

            <div className="flex items-center gap-4">
                <button className="text-black hover:text-gray-600">
                    <FaSearch size={18} />
                </button>

                <div className="relative">
                    <button className="text-black hover:text-gray-600">
                        <FaShoppingCart size={20} />
                    </button>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartItemCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
