// types/cart.ts

export interface CartItem {

    id: number;
    title: string;
    price: number;
    discountedPrice?: number;
    image: {
        url: string;
        alt?: string;
    };
    quantity: number;

}

