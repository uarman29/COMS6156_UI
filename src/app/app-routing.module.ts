import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'products', component: ProductsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
