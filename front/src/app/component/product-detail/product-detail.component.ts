import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Entities/cart-item';
import { Product } from 'src/app/Entities/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product: Product = new Product();
  constructor(private productService: ProductService,private route: ActivatedRoute,private cartService: CartService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.productdetails();
    })
  }

  productdetails(){
   
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitePrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }
}
