import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { UsersViewComponent } from './components/users-view/users-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { CardsViewComponent } from './components/cards-view/cards-view.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { AddressesViewComponent } from './components/addresses-view/addresses-view.component';
import { AddressViewComponent } from './components/address-view/address-view.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewComponent,
    NavbarComponent,
    ProductViewComponent,
    UsersViewComponent,
    UserViewComponent,
    CardsViewComponent,
    CardViewComponent,
    AddressesViewComponent,
    AddressViewComponent,
    OrdersViewComponent,
    OrderViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
