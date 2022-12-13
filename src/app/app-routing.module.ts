import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressViewComponent } from './components/address-view/address-view.component';
import { AddressesViewComponent } from './components/addresses-view/addresses-view.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { CardsViewComponent } from './components/cards-view/cards-view.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

const routes: Routes = [
  { path: 'products/:id', component: ProductViewComponent, canActivate: [LoggedInGuard] },
  { path: 'products', component: ProductsViewComponent, canActivate: [LoggedInGuard] },
  { path: 'user', component: UserViewComponent, canActivate: [LoggedInGuard] },
  { path: 'cards/:id', component: CardViewComponent, canActivate: [LoggedInGuard] },
  { path: 'cards', component: CardsViewComponent, canActivate: [LoggedInGuard] },
  { path: 'addresses/:id', component: AddressViewComponent, canActivate: [LoggedInGuard] },
  { path: 'addresses', component: AddressesViewComponent, canActivate: [LoggedInGuard] },
  { path: 'orders/:id', component: OrderViewComponent, canActivate: [LoggedInGuard] },
  { path: 'orders', component: OrdersViewComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginViewComponent, canActivate: [LoggedOutGuard] },
  { path: 'cart', component: CartViewComponent, canActivate: [LoggedInGuard] },
  { path: 'checkout', component: CheckoutViewComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
