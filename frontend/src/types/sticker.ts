export type Sticker = {
    id: number;
    title: string;
    description?: string;
    category?: string;
    sticker_type: "single" | "sheet";
    stock_quantity: number;
    price: number;
    discount: number;
    height: number;
    width: number;
    created_at: string;
    updated_at: string;
    images?: ProductImage[];
};

export type ProductImage = {
    id?: number;
    product_id?: number;
    image_url: string;
    image_alt: string;
    is_primary: boolean;
  };  

