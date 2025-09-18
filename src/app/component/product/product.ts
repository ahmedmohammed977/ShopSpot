import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { TextTrimPipe } from '../../pipes/text-trim-pipe';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { WishlistService } from '../../services/wishlist';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,
    TextTrimPipe,
    RouterLink,
    HttpClientModule,
    FilterPipe,
    FormsModule,],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {
   showMessage: string = '';
  constructor(private _productsService: Products,
    private wishlistService: WishlistService,
    private cartService: Cart
   ) {}
  productsArray: Product[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this.getProducts();
    this.cartService.creatCart();
  }
  getProducts() {
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this.productsArray = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToWishlist(product: Product) {
    this.showMessage = this.wishlistService.addToWishlist(product);
    setTimeout(() => this.showMessage = '', 3000);
  }

  removeFromWishlist(product: Product) {
    this.showMessage = this.wishlistService.removeFromWishlist(product);
    setTimeout(() => this.showMessage = '', 3000);
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product);
  }
  isInCart(product: any): boolean {
    return this.cartService.isInCart(product.id);
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
