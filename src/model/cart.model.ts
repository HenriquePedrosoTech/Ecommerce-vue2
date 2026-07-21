import { Product } from './product.model'

export interface ICartItem {
  product: Product
  quantity: number
}

export class Cart {
  constructor(
    public list: ICartItem[] = [],
    public total: number = 0,
  ) {}
}
