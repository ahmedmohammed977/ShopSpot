import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../services/cart';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  productsArray: Product[] = [];
  total: number = 0;
  paymentMethod: string = '';
  paymentData: any = {}; 

  constructor(private _cartService: Cart) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const cart = this._cartService.getCart();
    this.productsArray = cart?.products || [];
    this.calculateTotal();
  }

  removeProduct(product: Product) {
    this._cartService.deleteFromCart(product);
    this.loadCart();
  }

  increaseQuantity(product: Product) {
    const newQty = (product.quantity || 1) + 1;
    const userEmail = this._cartService.getCart()?.email || '';
    this._cartService.updateQuantity(product.id, userEmail, newQty);
    this.loadCart();
  }

  decreaseQuantity(product: Product) {
    const newQty = (product.quantity || 1) - 1;
    const userEmail = this._cartService.getCart()?.email || '';

    if (newQty <= 0) {
      this.removeProduct(product);
    } else {
      this._cartService.updateQuantity(product.id, userEmail, newQty);
      this.loadCart();
    }
  }

  calculateTotal() {
    this.total = this.productsArray.reduce(
      (sum, p) => sum + (p.price * (p.quantity || 1)),
      0
    );
  }

  selectPayment(method: string) {
    this.paymentMethod = method;
    this.paymentData = {}; 
  }

  confirmPayment() {
    console.log(`${this.paymentMethod} payment data:`, this.paymentData);
    alert(`${this.paymentMethod} payment confirmed!`);
  }
}
