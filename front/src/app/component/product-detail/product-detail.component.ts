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
export class ProductDetailComponent implements OnInit {
  product: Product = new Product(); // Instance de produit initialisée à un nouveau produit vide

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Souscrire aux modifications des paramètres d'URL
    this.route.paramMap.subscribe(() => {
      this.productdetails(); // Appeler la fonction productdetails à chaque modification
    });
  }

  productdetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'identifiant du produit à partir de l'URL

    this.productService.getProductById(theProductId).subscribe(
      (data) => {
        this.product = data; // Mettre à jour les détails du produit avec les données récupérées du service
      }
    );
  }

  addToCart() {
    console.log(`Ajouter au panier: ${this.product.name}, ${this.product.unitePrice}`); // Afficher dans la console le nom et le prix du produit ajouté au panier

    const theCartItem = new CartItem(this.product); // Créer un nouvel élément de panier à partir du produit

    this.cartService.addToCart(theCartItem); // Ajouter l'élément de panier au service de panier
  }
}
