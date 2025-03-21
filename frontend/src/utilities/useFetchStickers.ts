import { useEffect } from "react";
import { useStickerStore } from "../store/stickerStore";

export function useFetchStickers() {
    const { stickers, loading, error, fetchStickers, deleteSticker } = useStickerStore();

    useEffect(() => {
        fetchStickers();
    }, [fetchStickers]);

    return { stickers, loading, error, deleteSticker };
}
