import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendServiceService, CartItem, Product, ProductMap } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})

export class CartViewComponent implements OnInit {

  cartItems:CartItem[] = [];
  productMap:ProductMap = {};

  cartItemForm = this.fb.group({
    current_items: this.fb.array([])
  }); 

  get current_items() {
    return this.cartItemForm.get('current_items') as FormArray;
  }

  constructor(
    private backendService:BackendServiceService,
    private fb:FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  loadCartItems() {
    this.backendService.getCartItems().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.current_items.clear();
          this.cartItems = response.body;
          for(let item of this.cartItems) {
            let itemForm = this.fb.group({
              img_url: [this.productMap[item.product_id].img_url],
              product_id: [item.product_id],
              quantity: [item.quantity],
              price: [this.productMap[item.product_id].price],
            });
            this.current_items.push(itemForm);
          }
        }
      }
    }, err => {
      if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }

  loadProducts() {
    this.backendService.getProducts().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          let products:Product[] = response.body;
          products.forEach(product =>{
            this.productMap[product.product_id] = product;
          });
          this.loadCartItems();
        }
      }
    }, err => {
      if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  updateCartItem(i: number) {
    let cartItem:CartItem = {product_id: this.current_items.at(i).get('product_id')!.value, quantity: this.current_items.at(i).get('quantity')!.value};
    this.backendService.updateCartItem(cartItem).subscribe(response => {
      if(response.status == 200)
        this.loadCartItems();
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }

  deleteCartItem(i: number) {
    let cartItem:CartItem = {product_id: this.current_items.at(i).get('product_id')!.value, quantity: this.current_items.at(i).get('quantity')!.value};
    this.backendService.deleteCartItem(cartItem).subscribe(response => {
      if(response.status == 200)
        this.loadCartItems();
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }

}
