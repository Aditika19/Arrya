import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  addProduct(newProduct: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, newProduct);
  }

  updateProduct(productId: string, updatedProduct: any): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/products/${productId}`,
      updatedProduct
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete<Product>(`${this.apiUrl}/products/${productId}`);
  }
}
