import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../Entities/purchase';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase'; // URL de l'API pour passer une commande

  constructor(private httpClient: HttpClient) { } // Injection du service HttpClient dans le service CheckoutService

  placeOrder(purchase: Purchase): Observable<any> {
    // Méthode pour passer une commande en utilisant l'API
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase); // Effectue une requête POST vers l'URL d'achat avec les détails de la commande
  }
}