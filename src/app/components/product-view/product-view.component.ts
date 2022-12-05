import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService, CartItem, Product } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product!:Product;
  id!:number;
  cartItem?:CartItem;

  quantityForm = this.fb.group({
    quantity: [] 
  }); 

  get quantity() {
    return this.quantityForm.get('quantity') as FormControl;
  }

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getProduct(this.id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.product = response.body;
          this.backendService.getCartItem(this.product.product_id).subscribe(response =>{
            if(response.status == 200) {
              if(response.body) {
                this.cartItem = response.body;
                this.quantity.setValue(this.cartItem.quantity);
              }
            }
          })
        }
      }
    });
  }

  addToCart() {
    this.backendService.getCartItem(this.product.product_id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          let ci:CartItem = response.body;
          ci.quantity += 1;
          this.backendService.updateCartItem(ci).subscribe(response =>{
            if(response.status == 200) {
              if(response.body) {
                this.cartItem = response.body;
                this.quantity.setValue(this.cartItem.quantity);
              }
            }
          });
        }
      }
    }, err => {
      if(err.status == 404) {
        let ci:CartItem = {product_id: this.product.product_id, quantity: 1};
        this.backendService.addCartItem(ci).subscribe(response =>{
          if(response.status == 200) {
            if(response.body) {
              this.cartItem = response.body;
              this.quantity.setValue(this.cartItem.quantity);
            }
          }
        });
      }
    })
  }

  removeFromCart() {
    this.backendService.getCartItem(this.product.product_id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          let ci:CartItem = response.body;
          ci.quantity -= 1;
          if(ci.quantity > 0) {
            this.backendService.updateCartItem(ci).subscribe(response =>{
              if(response.status == 200) {
                if(response.body) {
                  this.cartItem = response.body;
                  this.quantity.setValue(this.cartItem.quantity);
                }
              }
            });
          } else {
            this.backendService.deleteCartItem(ci).subscribe(response =>{
              if(response.status == 200) {
                if(response.body) {
                  this.cartItem = undefined;
                  this.quantity.setValue(0);
                }
              }
            })
          }
        }
      }
    })
  }
}
