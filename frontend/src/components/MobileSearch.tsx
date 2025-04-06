import { useState } from "react";
import { useStickerStore } from "../store/stickerStore";
import { Sticker } from "../types/sticker";
import { Link } from "react-router-dom";

interface SearchProps {
  setShowSearch: (show: boolean) => void;
}

export function MobileSearch({ setShowSearch }: SearchProps) {
  const [input, setInput] = useState("");
  const { stickers } = useStickerStore();
  const [filteredResults, setFilteredResults] = useState<Sticker[]>([]);

  const filterProducts = (value: string) => {
    setInput(value);

    if (!value.trim()) {
      setFilteredResults([]);
      return;
    }

    const filtered = stickers.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <input
        className="border rounded p-2 w-full focus:ring-2 focus:ring-primary outline-none"
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => filterProducts(e.target.value)}
        autoFocus
      />

      {/* Dropdown with results */}
      {filteredResults.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border mt-1 rounded shadow-md max-h-60 overflow-y-auto">
          {filteredResults.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => setShowSearch(false)}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* No match */}
      {input && filteredResults.length === 0 && (
        <div className="absolute z-50 w-full bg-white border mt-1 rounded shadow-md text-sm px-4 py-2 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
}
