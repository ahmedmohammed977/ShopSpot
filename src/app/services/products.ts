import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Products {
  baseUrl: string = 'https://fakestoreapi.com';
  constructor(private _httpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/products`);
  }
  getSingleProduct(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/products/${id}`);
  }
}
