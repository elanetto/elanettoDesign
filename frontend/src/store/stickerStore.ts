import { create } from "zustand";
import { Sticker } from "../types/sticker";
import { BASE_URL } from "../constants";

interface StickerState {
    stickers: Sticker[];
    specificSticker: Sticker | null;
    loading: boolean;
    error: string | null;
    fetchStickers: () => Promise<void>;
    fetchSpecificSticker: (productId: string) => Promise<void>;
    deleteSticker: (productId: number) => Promise<void>;
    updateSticker: (productId: string, updatedData: Partial<Sticker>) => Promise<void>;
    setStickers: (stickers: Sticker[]) => void;
}

export const useStickerStore = create<StickerState>((set) => ({
    stickers: [],
    specificSticker: null,
    loading: false,
    error: null,

    fetchStickers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${BASE_URL}/stickers`);
            if (!response.ok) throw new Error(`Failed to fetch stickers: ${response.status}`);

            const result = await response.json();
            set({ stickers: Array.isArray(result) ? result : result.data || [], loading: false });
        } catch (err) {
            console.error("Error fetching stickers:", err);
            set({
                loading: false,
                error: err instanceof Error ? err.message : "Unknown error",
                stickers: [],
            });
        }
    },

    fetchSpecificSticker: async (productId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${BASE_URL}/stickers/${productId}`);
            if (!response.ok) throw new Error(`Failed to fetch sticker: ${response.status} - ${response.statusText}`);

            const result = await response.json();
            set({ specificSticker: result, loading: false });
        } catch (err) {
            console.error("Error fetching specific sticker:", err);
            set({
                loading: false,
                error: err instanceof Error ? err.message : "Unknown error",
                specificSticker: null,
            });
        }
    },

    updateSticker: async (productId: string, updatedData: Partial<Sticker>) => {
        try {
            const response = await fetch(`${BASE_URL}/stickers/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error(`Failed to update sticker: ${response.status}`);

            set((state) => ({
                stickers: state.stickers.map((sticker) =>
                    sticker.id === Number(productId) ? { ...sticker, ...updatedData } : sticker
                ),
            }));
        } catch (err) {
            console.error("Error updating sticker:", err);
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        }
    },

    deleteSticker: async (productId: number) => {
        try {
            const response = await fetch(`${BASE_URL}/stickers/${productId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error(`Failed to delete sticker: ${response.status}`);

            set((state) => ({
                stickers: state.stickers.filter((product) => product.id !== productId),
            }));
        } catch (err) {
            console.error("Error deleting sticker:", err);
            set({ error: err instanceof Error ? err.message : "Unknown error" });
        }
    },

    setStickers: (stickers: Sticker[]) => set({ stickers }),
}));
