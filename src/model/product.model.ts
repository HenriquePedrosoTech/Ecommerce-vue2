import { Image } from '@/model/image.model';
export class Product {
// categoryId:"f394825c-0264-495f-84f3-3a7dcce75f89"
// compareAtPrice:1199.99
// createdAt:"2026-07-16T23:10:02.930Z"
// description:"Smartphone Apple"
// id:"945dbe50-6d9d-49b2-b337-2c065de9fe9a"
// images: []
// isActive: true
// name:"iPhone 15 Pro"
// price:999.99
// sku:"IPH-15-CLEAN"
// slug:"iphone-15-pro-clean"
// stock:10
// stripePriceId:null
// stripeProductId:null
// updatedAt:"2026-07-16T23:10:02.930Z"
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public descount: number,
    public images: Image[] = [],
  ) {}

  getPrice() {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.price);
  }
}


