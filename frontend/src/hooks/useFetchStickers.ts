import { useEffect } from "react";
import { useStickerStore } from "../store/stickerStore";

export function useFetchStickers(productId?: string) {
    const { stickers, specificSticker, loading, error, fetchStickers, fetchSpecificSticker, deleteSticker } = useStickerStore();

    useEffect(() => {
        if (productId) {
            fetchSpecificSticker(productId);
        } else {
            fetchStickers();
        }
    }, [fetchStickers, fetchSpecificSticker, productId]);

    return {
        stickers,
        specificSticker,
        loading,
        error,
        deleteSticker
    };
}
