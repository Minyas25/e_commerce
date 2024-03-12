import { Product } from "./products";

export class CartItem {
    id: string;
    name: string;
    img: string;
    unitPrice: number;

    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.img = product.img;
        this.unitPrice = product.unitePrice;

        this.quantity = 1;
    }
}