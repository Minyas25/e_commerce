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

  private baseUrl = 'http://127.0.0.1:8000/api/products';
  private categoryUrl ='http://127.0.0.1:8000/api/categories';
  constructor(private httpClient: HttpClient) { }

  fetchAll() {
    return this.httpClient.get<Product[]>(environment.serverUrl+'/api/products')
    //pfff
    // .pipe(map(data => data.map(item => ({...item, released:item.released.substring(0,10)}))));
  }
  getProductListPagination(thePage: number,thePageSize: number,thencategoryID : number): Observable<GetResponseProducts> {
    
      
      const searchUrl = `${this.baseUrl}?_page=${thePage}&itemsPerPage=${thePageSize}&category=${thencategoryID}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
  } 

    getProductList(thencategoryID : number): Observable<Product[]> {
  
  
   const searchUrl = (`${this.baseUrl}?category=/api/categories/${thencategoryID}`);
   
   return this.httpClient.get<Product[]>(searchUrl);
   
  }  

  addProduct(product: Product): Observable<Product> {

  const headers = new HttpHeaders({

    'Content-Type': 'application/json'

  });

  return this.httpClient.post<Product>(this.baseUrl, product, { headers });

}
/*  getProductList(): Observable<Product[]> {
    
      return this.httpClient.get<Product[]>(this.baseUrl);
  }  */


  searchProducts(theKeyword: string): Observable<Product[]> {

    
    const searchUrl = `${this.baseUrl}?name=${theKeyword}`;

    return this.httpClient.get<Product[]>(searchUrl);
  }

  searchProductListPagination(thePage: number,thePageSize: number,theKeyword : string): Observable<GetResponseProducts> {
   
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`+ `&page=${thePage}&size=${thePageSize}`;

   return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response.member.products));
  }

  getProductById(theProductId: number): Observable<Product> {

    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    /*  return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response.member.productCategory)
      );  */
       return this.httpClient.get<ProductCategory[]>(this.categoryUrl); 
    }

}

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

interface GetResponseProductCategory {
  member: {
    productCategory: ProductCategory[];
  }
}