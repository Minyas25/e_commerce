import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../Entities/country';

@Injectable({
  providedIn: 'root'
})
export class ShopformService {
  private countriesUrl = 'http://localhost:8080/api/countries'; // URL de l'API pour les pays
  private statesUrl = 'http://localhost:8080/api/states'; // URL de l'API pour les états

  constructor(private httpClient: HttpClient) { }

  // Récupérer la liste des pays
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries) // Mapper la réponse pour obtenir la liste des pays
    );
  }

  // Récupérer les mois de validité des cartes de crédit à partir d'un mois de départ
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data); // Retourner les mois de validité des cartes de crédit sous forme d'observable
  }

  // Récupérer les années de validité des cartes de crédit
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data); // Retourner les années de validité des cartes de crédit sous forme d'observable
  }
}

// Interface pour la réponse des pays
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}