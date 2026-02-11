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
