import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UsersViewComponent } from './components/users-view/users-view.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'products', component: ProductsViewComponent },
  { path: 'users/:id', component: UserViewComponent },
  { path: 'users', component: UsersViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
