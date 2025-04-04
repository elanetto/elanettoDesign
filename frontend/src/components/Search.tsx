import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStickerStore } from "../store/stickerStore";
import { FaSearch } from "react-icons/fa";

export function Search() {
  const { searchQuery, setSearchQuery } = useStickerStore();
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname, setSearchQuery]);

  const handleSearch = () => {
    console.log("Search triggered:", searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 px-4">
      <div className="flex rounded-xl shadow-sm border focus-within:ring-2 focus-within:ring-primary overflow-hidden">
        <input
          className="flex-grow px-4 py-2 focus:outline-none"
          type="text"
          placeholder="Search stickers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-primary text-white hover:bg-primary-hover transition"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
