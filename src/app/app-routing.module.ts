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

const routes: Routes = [
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'products', component: ProductsViewComponent },
  { path: 'user', component: UserViewComponent },
  { path: 'cards/:id', component: CardViewComponent },
  { path: 'cards', component: CardsViewComponent },
  { path: 'addresses/:id', component: AddressViewComponent },
  { path: 'addresses', component: AddressesViewComponent },
  { path: 'orders/:id', component: OrderViewComponent },
  { path: 'orders', component: OrdersViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'cart', component: CartViewComponent },
  { path: 'checkout', component: CheckoutViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
