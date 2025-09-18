import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  constructor() {}

  creatCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  addToCart(product: Product) {
    const cart = localStorage.getItem('cart');
    const user = localStorage.getItem('userData');
    if (cart) {
      const cartArray: { email: string; products: Product[] }[] = JSON.parse(cart);
      if (user) {
        const userData: User = JSON.parse(user);

        const checkUserCart = cartArray.find(item => item.email === userData.email);

        if (!checkUserCart) {
          cartArray.push({
            email: userData.email,
            products: [{ ...product, quantity: 1 }],
          });
        } else {
          const checkProduct = checkUserCart.products.find(prod => prod.id === product.id);
          if (!checkProduct) {
            checkUserCart.products.push({ ...product, quantity: 1 });
          } else {
            const currentProductIndex = checkUserCart.products.findIndex(
              prod => prod.id === product.id
            );
            checkUserCart.products.splice(currentProductIndex, 1, {
              ...checkProduct,
              quantity: (checkProduct.quantity || 0) + 1,
            });
          }
        }
        localStorage.setItem('cart', JSON.stringify(cartArray));
      }
    }
  }

  getCart(): { email: string; products: Product[] } | undefined {
    const user = localStorage.getItem('userData');
    const cart = localStorage.getItem('cart');
    if (user && cart) {
      const userData: User = JSON.parse(user);
      const cartArray = JSON.parse(cart);

      return cartArray.find(
        (item: { email: string; products: Product[] }) => item.email === userData.email
      );
    }
    return undefined;
  }

  getAllCarts(): { email: string; products: Product[] }[] {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart) as { email: string; products: Product[] }[];
    }
    return [];
  }

  deleteFromCart(product: Product) {
    const data = this.getCart();
    if (data) {
      const updatedCart = data.products.filter(prod => prod.id !== product.id);

      let cartArray = this.getAllCarts();
      cartArray = cartArray.filter(cart => cart.email !== data.email);

      cartArray.push({ ...data, products: updatedCart });
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }

  clearCart() {
    const data = this.getCart();
    if (data) {
      let cartArray = this.getAllCarts();
      cartArray = cartArray.filter(cart => cart.email !== data.email);

      cartArray.push({ ...data, products: [] });
      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }

  updateQuantity(productId: number, userEmail: string, newQuantity: number) {
    const userCart = this.getCart();
    if (userCart) {
      const product = userCart.products.find(prod => prod.id === productId);
      if (product) {
        product.quantity = newQuantity;

        const updatedCart = userCart.products.filter(prod => prod.id !== productId);
        updatedCart.push(product);

        let cartsArray = this.getAllCarts();
        cartsArray = cartsArray.filter(cart => cart.email !== userEmail);
        cartsArray.push({ ...userCart, products: updatedCart });

        localStorage.setItem('cart', JSON.stringify(cartsArray));
      }
    }
  }
  isInCart(productId: number): boolean {
  const data = this.getCart();
  if (data) {
    return data.products.some(prod => prod.id === productId);
  }
  return false;
}

}
