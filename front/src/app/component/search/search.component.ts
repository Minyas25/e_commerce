import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) { } // Injection du service Router dans le composant

  ngOnInit(): void {
    // La méthode ngOnInit est appelée lorsque le composant est initialisé
    // Elle pourrait être utilisée pour effectuer des actions supplémentaires lors de l'initialisation du composant, mais dans ce cas, elle est vide.
  }

  doSearch(value: string) {
    // Méthode pour effectuer une recherche
    console.log(`value=${value}`); // Affiche la valeur de la recherche dans la console
    this.router.navigateByUrl(`/search/${value}`); // Redirige l'utilisateur vers la page de recherche avec le terme de recherche dans l'URL
  }
}

