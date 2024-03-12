import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/Entities/product-category';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  productCategories!:ProductCategory [];
  constructor(private productservices:ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productservices.getProductCategories().subscribe(
      data => {
        console.log('product categories='+JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
