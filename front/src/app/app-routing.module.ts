import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { ProductsComponent } from './component/products/products.component';
import { OrderComponent } from './component/order/order.component';
import { HomeComponent } from './component/home/home.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  {path:'checkout',component: OrderComponent},
    {path:'cart-detail',component: CartDetailComponent},
    {path:'product/:id',component: ProductDetailComponent},
    {path:'search/:keyword',component: ProductsComponent},
    {path:'category/:id',component: ProductsComponent},
    {path:'category',component: ProductsComponent},
    {path:'products',component: ProductsComponent},
    {path:'contact',component: ContactComponent},
    {path:'add',component: AddProductComponent},
    {path:'home',component: HomeComponent},
    {path:'', redirectTo: '/products', pathMatch: 'full'},
    {path:'**',redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
