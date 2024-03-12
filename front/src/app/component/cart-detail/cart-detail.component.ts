import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/Entities/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({

  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']

})

export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = []; // Tableau d'éléments du panier initialisé à vide

  cart$: Observable<CartItem[]>; // Observable pour les éléments du panier

  totalPrice$: Observable<number>; // Observable pour le prix total
  totalQuantity$: Observable<number>; // Observable pour la quantité totale

  constructor(private cartService: CartService) {
    // Initialisation des observables avec les valeurs du service de panier
    this.cart$ = this.cartService.cart$;
    this.totalPrice$ = this.cartService.totalPrice$;
    this.totalQuantity$ = this.cartService.totalQuantity$;
  }

  ngOnInit(): void {
    // La méthode ngOnInit est appelée lorsque le composant est initialisé
    // Elle pourrait être utilisée pour effectuer des actions supplémentaires lors de l'initialisation du composant, mais dans ce cas, elle est vide.
  }

  incrementQuantity(theCartItem: CartItem) {
    // Incrémenter la quantité d'un élément du panier
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    // Décrémenter la quantité d'un élément du panier
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    // Supprimer un élément du panier
    this.cartService.remove(theCartItem);
  }
}
