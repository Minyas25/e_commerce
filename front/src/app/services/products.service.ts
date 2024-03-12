import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Entities/products';
import { ProductCategory } from '../Entities/product-category';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/products'; // URL de base pour les produits
  private categoryUrl ='http://127.0.0.1:8000/api/categories'; // URL de base pour les catégories de produits

  constructor(private httpClient: HttpClient) { }

  // Récupérer tous les produits
  fetchAll() {
    return this.httpClient.get<Product[]>(environment.serverUrl+'/api/products');
  }

  // Récupérer une liste paginée de produits en fonction de la catégorie
  getProductListPagination(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}?_page=${thePage}&itemsPerPage=${thePageSize}&category=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Récupérer une liste de produits en fonction de la catégorie
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}?category=/api/categories/${theCategoryId}`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  // Ajouter un produit
  addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<Product>(this.baseUrl, product, { headers });
  }

  // Rechercher des produits par mot-clé
  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}?name=${theKeyword}`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  // Rechercher une liste paginée de produits par mot-clé
  searchProductListPagination(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Récupérer un produit par ID
  getProductById(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  // Récupérer les catégories de produits
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }
}

// Interface pour la réponse des produits
interface GetResponseProducts {
  member: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

// Interface pour la réponse des catégories de produits
interface GetResponseProductCategory {
  member: {
    productCategory: ProductCategory[];
  }
}