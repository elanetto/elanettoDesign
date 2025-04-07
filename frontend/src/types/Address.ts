export interface Address {
    id?: number;
    full_name: string;
    street_address: string;
    city: string;
    postal_code: string;
    country: string;
    phone_number?: string;
    is_default?: boolean;
  }
  