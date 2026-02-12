// "molde" de tabla productos

export interface Product {
  id: number;
  name: string;
  brand: string;
  storage: number;
  price: number;
  stock: number;
  img_url: string;
}

export interface Sale {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  client_id: number;
  created_at: string;
}

export interface Profile {
  email: string;
}

export interface SaleWithProduct extends Sale {
  products: Product | null;
  profiles: Profile | null;
}
