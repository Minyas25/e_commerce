import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../Entities/cart-item';

@Injectable({

  providedIn: 'root'

})

export class CartService {
  cartItems: CartItem[] = []; // Tableau des éléments du panier

  // Observables pour le prix total, la quantité totale et le contenu du panier
  private totalPrice = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPrice.asObservable();

  private totalQuantity = new BehaviorSubject<number>(0);
  public totalQuantity$ = this.totalQuantity.asObservable();

  private cart = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cart.asObservable();

  constructor() {}

  addToCart(cart: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    // Vérifier si l'élément est déjà présent dans le panier
    for (let c of this.cartItems) {
      if (c.id === cart.id) {
        existingCartItem = c;
        break;
      }
    }

    alreadyExistsInCart = existingCartItem !== undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++; // Incrémenter la quantité si l'élément est déjà présent dans le panier
    } else {
      this.cartItems.push(cart); // Ajouter l'élément au panier s'il n'est pas déjà présent
    }

    this.computeCartTotals(); // Calculer les totaux du panier
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // Calculer le prix total et la quantité totale à partir des éléments du panier
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // Mettre à jour les observables avec les nouveaux totaux
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.cart.next(this.cartItems);

    this.logCartData(totalPriceValue, totalQuantityValue); // Afficher les données du panier dans la console
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem); // Supprimer l'élément du panier si la quantité devient zéro
    } else {
      this.computeCartTotals(); // Recalculer les totaux du panier
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1); // Supprimer l'élément du panier
      this.computeCartTotals(); // Recalculer les totaux du panier
    }
  }
}
