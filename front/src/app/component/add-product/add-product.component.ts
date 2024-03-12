import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Entities/products';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  newProduct: Product= new Product();
constructor(private productService: ProductService) {}

ngOnInit(): void {
    this.newProduct = {
      id: '',
      sku: '',
      name: '',
      description: '',
      unitePrice: 0, 
      img: '',
      active: true, 
      unitsInStock: 0, 
      dateCreated: new Date(),
      lastUpdate: new Date()
    }
}
onSubmit() {

  this.productService.addProduct(this.newProduct).subscribe({

    next: (response) => {

      console.log('Produit ajouté avec succès', response);

    },

    error:(error) => {

      console.error('Erreur lors de l\'ajout du produit', error);

    }

  });

}

onFileSelect(event: Event): void {

}

}
