import {create} from "zustand";
import {persist} from "zustand/middleware";
import { CartItem } from "../types/cart";

interface CartStore {

    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    itemIncrement: (productId: number) => void;
    itemDecrement: (productId: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => {
                    const existingProduct = state.cart.find((item) => item.id === product.id);
                    if (existingProduct) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return {
                        cart: [...state.cart, { ...product, quantity: 1 }],
                    };
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                })),
            itemIncrement: (productId) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),
            itemDecrement: (productId) =>
                set((state) => ({
                    cart: state.cart
                        .map((item) =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),
            getTotalPrice: () => {
                const { cart } = get();
                return cart.reduce(
                    (total, item) => total + item.quantity * (item.discountedPrice || item.price),
                    0
                );
            },
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart-storage",
            getStorage: () => localStorage,
        }
    )
);

