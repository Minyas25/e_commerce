import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/Entities/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({

  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']

})

export class CartDetailComponent implements OnInit{
  cartItems: CartItem[] = []; 

  cart$: Observable<CartItem[]>;

  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;

  constructor(private cartService: CartService) {

    this.cart$ = this.cartService.cart$;

    this.totalPrice$ = this.cartService.totalPrice$;

    this.totalQuantity$ = this.cartService.totalQuantity$;

  }

  ngOnInit(): void {

  }

  incrementQuantity(theCartItem: CartItem) {

    this.cartService.addToCart(theCartItem);

  }

  decrementQuantity(theCartItem: CartItem) {

    this.cartService.decrementQuantity(theCartItem);

  }

  remove(theCartItem: CartItem) {

    this.cartService.remove(theCartItem);

  }

}