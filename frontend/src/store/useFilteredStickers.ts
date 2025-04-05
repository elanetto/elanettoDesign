import { useStickerStore } from "./stickerStore";
import Fuse from "fuse.js";

export function useFilteredStickers() {
  const { stickers, searchQuery } = useStickerStore();

  if (!searchQuery) return stickers;

  const fuse = new Fuse(stickers, {
    keys: [
      "title",
      "description",
      "category",
      "images.image_alt"
    ],
    includeScore: false,
    threshold: 0.4,
  });

  const results = fuse.search(searchQuery);

  return results.map(result => result.item);
}
