import { useState } from "react";
import { useStickerStore } from "../store/stickerStore";
import { Sticker } from "../types/sticker";

interface SearchProps {
    setResults: (results: Sticker[]) => void;
}

export function Search({ setResults }: SearchProps) {
    const [input, setInput] = useState("");
    const { stickers } = useStickerStore();

    const filterProducts = (value: string) => {
        setInput(value);

        if (!value) {
            setResults(stickers);
            return;
        }

        const filteredResults = stickers.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );

        setResults(filteredResults);
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                type="text"
                placeholder="search products..."
                value={input}
                onChange={(e) => filterProducts(e.target.value)}
            />
        </div>
    );
}