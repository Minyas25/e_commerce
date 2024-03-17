import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Entities/products';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  @Input()
  product: Product = {
    id:'',
    sku: '',
    name: '',
    description: '',
    img: '',
    unitePrice: 0,
    active: false,
    unitsInStock: 0,
    dateCreated: new Date,
    lastUpdate: new Date
  
  };
  @Output()
  added = new EventEmitter<Product>();
  handleImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = () => {
        this.product.img = reader.result as string; // Assurez-vous que 'img' est la propriété correcte pour l'image
      };
    }
  }
  handleSubmit() {
    this.added.emit(this.product);
  }
}
