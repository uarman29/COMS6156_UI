import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

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
    }, err => {
      if(err.status == 400 || err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/products");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/products");
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
          }, err => {
            if(err.status == 400 || err.status == 409) {
              alert("Invalid Input");
            } else if(err.status == 401) {
              this.auth.logout();
            } else if(err.status == 500) {
              alert("Something went wrong");
              this.router.navigateByUrl("/");
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
        }, err => {
          if(err.status == 400 || err.status == 409) {
            alert("Invalid Input");
          } else if(err.status == 401) {
            this.auth.logout();
          } else if(err.status == 500) {
            alert("Something went wrong");
            this.router.navigateByUrl("/");
          }
        });
      } else if(err.status == 400 || err.status == 403) {
        this.router.navigateByUrl("/products");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/products");
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
            }, err => {
              if(err.status == 400 || err.status == 409) {
                alert("Invalid Input");
              } else if(err.status == 401) {
                this.auth.logout();
              } else if(err.status == 500) {
                alert("Something went wrong");
                this.router.navigateByUrl("/");
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
            }, err => {
              if(err.status == 400 || err.status == 409) {
                alert("Invalid Input");
              } else if(err.status == 401) {
                this.auth.logout();
              } else if(err.status == 500) {
                alert("Something went wrong");
                this.router.navigateByUrl("/");
              }
            })
          }
        }
      }
    }, err => {
      if(err.status == 400 || err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/products");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/products");
      }
    })
  }
}
