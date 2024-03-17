import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './component/order/order.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductsComponent } from './component/products/products.component';
import { SearchComponent } from './component/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { CartService } from './services/cart.service';
import { AddProductComponent } from './component/add-product/add-product.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CartDetailComponent,
    NavbarComponent,
    ProductDetailComponent,
    ProductsComponent,
    SearchComponent,
    HomeComponent,
    AddProductComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
