import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { AddToCart } from '../add-to-cart/add-to-cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AddToCart, HttpClientModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit{
   constructor(
    private _productService: Products,
    private _activatedRoute: ActivatedRoute
  ) {}
  productId: string = '';
  product: Product = {
    image: '',
    title: '',
    rating: {
      count: 0,
      rate: 0,
    },
    price: 0,
    category: '',
    description: '',
    id: 0,
  };

  ngOnInit(): void {
    this.getProductId();
    this.getProduct();
  }

  getProductId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id') || '';
      },
    });
  }
  getProduct() {
    this._productService.getSingleProduct(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        console.log(response);
      },
    });
  }
}
