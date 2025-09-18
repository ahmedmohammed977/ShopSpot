import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { Products } from '../../services/products';
import { Product } from '../../interfaces/product';
import { TextTrimPipe } from '../../pipes/text-trim-pipe';
import { RouterLink } from '@angular/router';
import { AddToCart } from '../../component/add-to-cart/add-to-cart';
import { WishlistService } from '../../services/wishlist';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    TextTrimPipe,
    RouterLink,],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home implements OnInit {
  productsArray: Product[] = [];
  showMessage: string = '';

  constructor(private _productsService: Products,
    private wishlistService: WishlistService,
    private cartService: Cart
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.cartService.creatCart();
  }

  getProducts() {
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this.productsArray = response;
      },
      error: (error) => {
        console.log(error);
      }
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
