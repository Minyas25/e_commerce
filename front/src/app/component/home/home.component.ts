import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Entities/cart-item';
import { Product } from 'src/app/Entities/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: Product[] = []; // Tableau de produits initialisé à vide
  currentCategoryID!: number; // Identifiant de la catégorie actuelle, potentiellement non défini
  searchMode: boolean = false; // Mode de recherche, initialisé à faux par défaut
  previousCategoryId: number = 1; // Identifiant de catégorie précédent, initialisé à 1 par défaut

  thePageNumber: number = 1; // Numéro de page actuel, initialisé à 1
  thePageSize: number = 5; // Taille de la page, initialisée à 5
  theTotalElements: number = 0; // Nombre total d'éléments, initialisé à 0

  previousKeyword!: string; // Mot-clé de recherche précédent, potentiellement non défini

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Souscrire aux modifications des paramètres d'URL
    this.route.paramMap.subscribe(() => {
      this.listProduct(); // Appeler la fonction listProduct à chaque modification
    });
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); // Vérifier si le paramètre 'keyword' est présent dans l'URL

    if (this.searchMode) {
      this.handleSearchProducts(); // Si en mode de recherche, appeler la fonction handleSearchProducts
    } else {
      this.handleListProducts(); // Sinon, appeler la fonction handleListProducts
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; // Récupérer le mot-clé de recherche de l'URL

    this.productService.searchProducts(theKeyword).subscribe(
      (data) => {
        this.products = data; // Mettre à jour le tableau de produits avec les résultats de la recherche
      }
    );
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); // Vérifier si le paramètre 'id' est présent dans l'URL

    if (hasCategoryId) {
      this.currentCategoryID = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'identifiant de la catégorie à partir de l'URL
    } else {
      this.currentCategoryID = 1; // Si aucun identifiant de catégorie n'est présent, définir l'identifiant de catégorie actuel à 1
    }

    this.productService.getProductList(this.currentCategoryID).subscribe(
      (data) => {
        this.products = data; // Mettre à jour le tableau de produits avec les produits de la catégorie actuelle
      }
    );
  }

  addToCart(theProduct: Product) {
    console.log(`Ajouter au panier: ${theProduct.name}, ${theProduct.unitePrice}`); // Afficher dans la console le nom et le prix du produit ajouté au panier

    const theCartItem = new CartItem(theProduct); // Créer un nouvel élément de panier à partir du produit

    this.cartService.addToCart(theCartItem); // Ajouter l'élément de panier au service de panier
  }
}
