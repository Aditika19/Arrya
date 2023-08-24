export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  status: boolean;
}

export enum PageType {
  Admin = 'admin',
  Home = 'home',
}

export interface AuthPayload {
  username: string;
  password: string;
}

export enum ProductTypes {
  All = 'all',
  Men = 'men',
  Women = 'women',
  children = 'children',
  Miscellaneous = 'miscellaneous',
}
