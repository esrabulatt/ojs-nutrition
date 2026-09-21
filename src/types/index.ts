export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedSize?: string;
}

export interface VariantOption {
    id: string | number;
    name: string;
    inStock: boolean;
    priceDifference?: number;
  }
  
  export interface ProductVariant {
    id: string | number;
    title: string;
    options: VariantOption[];
  }
  
  export interface ProductSize {
    id: string;
    label: string;      // ör. "400G"
    servings?: number;  // ör. 16 → "16 servis"
    price: number;
    oldPrice?: number;
    badge?: string;     // ör. "%6 İNDİRİM"
  }

  export interface ProductDetails {
    features?: string;
    nutrition?: string;
    usage?: string;
    expiry?: string;    // ör. "07.2025"
  }

  export interface Product {
    id: string;
    name: string;
    shortDescription?: string; // <-- Eklenen alan
    price: number;
    originalPrice?: number;
    discountRate?: string;     // <-- Eklenen alan
    rating?: number;
    reviewCount?: number;
    image: string;
    category: string;
    isBestSeller?: boolean;
    description?: string;
    oldPrice?: number;
    discountBadge?: string;
    flavors?: string[];
    sizes?: ProductSize[];
    tags?: string[];
    details?: ProductDetails;
  }