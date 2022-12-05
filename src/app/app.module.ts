import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { CardsViewComponent } from './components/cards-view/cards-view.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { AddressesViewComponent } from './components/addresses-view/addresses-view.component';
import { AddressViewComponent } from './components/address-view/address-view.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewComponent,
    NavbarComponent,
    ProductViewComponent,
    UserViewComponent,
    CardsViewComponent,
    CardViewComponent,
    AddressesViewComponent,
    AddressViewComponent,
    OrdersViewComponent,
    OrderViewComponent,
    LoginViewComponent,
    CartViewComponent,
    CheckoutViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
