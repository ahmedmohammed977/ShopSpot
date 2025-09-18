import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];

  getWishlist(): Product[] {
    return this.wishlist;
  }

  addToWishlist(product: Product): string {
    if (!this.wishlist.find(p => p.id === product.id)) {
      this.wishlist.push(product);
      return `${product.title} تمت إضافته للمفضلة ❤️`;
    }
    return `${product.title} موجود بالفعل في المفضلة!`;
  }

  removeFromWishlist(product: Product): string {
    this.wishlist = this.wishlist.filter(p => p.id !== product.id);
    return `${product.title} تم إزالته من المفضلة ❌`;
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist.some(p => p.id === product.id);
  }
}
