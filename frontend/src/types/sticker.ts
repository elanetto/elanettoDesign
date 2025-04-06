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

    // ✅ Add this to support the correct category on ProductCard:
    category_link?: {
    product_id: number;
    category_id: number;
    product_type: string;
    category?: {
      id: number;
      name: string;
      created_at: string;
      is_active: boolean;
    };
  };
};

export type ProductImage = {
    id?: number;
    product_id?: number;
    image_url: string;
    image_alt: string;
    is_primary: boolean;
};  

