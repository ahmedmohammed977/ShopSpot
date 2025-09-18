import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService) {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(product: Product) {
    this.wishlistService.removeFromWishlist(product);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
