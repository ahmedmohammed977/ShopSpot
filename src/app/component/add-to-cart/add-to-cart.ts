import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../services/cart';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.html',
  styleUrls: ['./add-to-cart.css']
})
export class AddToCart {
  @Input() product!: Product;
  @Output() onAdded = new EventEmitter<Product>();

  constructor(private _cartService: Cart) {}

  addToCart(prod: Product) {
    this._cartService.creatCart();
    this._cartService.addToCart(prod);
    this.onAdded.emit(prod); 
  }
}
