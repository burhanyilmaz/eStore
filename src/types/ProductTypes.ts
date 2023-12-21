export interface ProductCategory {
  id: number;
  parent_category_id: number;
  title: string;
  category_type: string;
  class_name: string;
  created_at: string;
  images: string[];
}

export type ProductImage = {
  id: number;
  sort_order: string;
  attachment_type: string;
  class_name: string;
  created_at: string;
  thumbnail: string;
  large: string;
  small: string;
  extra_small: string;
  original: string;
  extra_props: {
    identified: boolean;
  };
};

export type Products = {
  id: number;
  title: string;
  brand: string;
  sap_id: string;
  sku: string;
  class_name: string;
  created_at: string;
  favorite: boolean;
  categories: ProductCategory[];
  original_price: string;
  discounted_price: string;
  price: string;
  quantity: number;
  max_allowed_quantity: number;
  shelf_zone: string;
  shelf_section: string;
  storage_shelf_zone: string;
  storage_shelf_section: string;
  sap_quantity: number;
  store_id: number;
  tax_percentage: string;
  properties: string[];
  store_product_id: number;
  images: ProductImage[];
};

export type GetProductsResponseType = {
  success: boolean;
  data: {
    items: Products[];
  };
  code: string;
  message: string;
};
