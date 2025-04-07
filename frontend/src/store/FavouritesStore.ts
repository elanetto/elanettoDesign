import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Sticker } from "../types/sticker";

interface FavouritesStore {
  favourites: Sticker[];
  toggleFavourite: (product: Sticker) => void;
  isFavourite: (id: number) => boolean;
  clearFavourites: () => void;
}

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: (product: Sticker) =>
        set((state) => ({
          favourites: state.favourites.some((item) => item.id === product.id)
            ? state.favourites.filter((item) => item.id !== product.id)
            : [...state.favourites, product],
        })),

      isFavourite: (id: number) =>
        get().favourites.some((item) => item.id === id),

      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: "elanetto-favourites", // updated localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
