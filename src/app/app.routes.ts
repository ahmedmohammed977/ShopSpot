import { Routes, provideRouter, withViewTransitions, withInMemoryScrolling} from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout').then(
        (m) => m.BlankLayout
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./component/home/home').then(
            (m) => m.Home
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./component/cart/cart').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./component/product/product').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./component/wishlist/wishlist').then(
            (m) => m.Wishlist
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./component/account/account').then(
            (m) => m.Account
          ),
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import('./component/product-details/product-details').then(
            (m) => m.ProductDetails
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then(
        (m) => m.AuthLayout
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./component/login/login').then(
            (m) => m.Login
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./component/sign-up/sign-up').then(
            (m) => m.SignUp
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./component/not-found/not-found').then(
        (m) => m.NotFound
      ),
  },
];
export const appRouter = provideRouter(
  routes,
  withViewTransitions(),
  withInMemoryScrolling({
    scrollPositionRestoration: 'enabled', 
    anchorScrolling: 'enabled',           
  })
);