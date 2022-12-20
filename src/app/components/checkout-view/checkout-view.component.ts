import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Address, BackendServiceService, Card, CartItem, Order, OrderItem, Product, ProductMap } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  ordering = false;
  productMap:ProductMap = {};
  cartItems:CartItem[] = [];
  addresses:Address[] = [];
  selectedAddress?:Address;
  cards:Card[] = [];
  selectedCard?:Card;
  total: number = 0;

  checkoutForm = this.fb.group({
    address_id: [],
    card_id: []
  }); 

  get address_id() {
    return this.checkoutForm.get('address_id') as FormControl;
  }

  get card_id() {
    return this.checkoutForm.get('card_id') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private backendService: BackendServiceService,
    private router: Router,
    private auth: AuthService
  ) { }

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

  loadCartItems() {
    this.backendService.getCartItems().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.cartItems = response.body;
          this.cartItems.forEach(item =>{
            this.total += item.quantity * this.productMap[item.product_id].price;
          })
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
    this.backendService.getAddresses().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.addresses = response.body;
          if(this.addresses.length > 0) {
            this.address_id.setValue(this.addresses[0].address_id);
            this.selectedAddress = this.addresses[0];
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

    this.backendService.getCards().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.cards = response.body
          if(this.cards.length > 0) {
            this.card_id.setValue(this.cards[0].card_id);
            this.selectedCard = this.cards[0];
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

  changeAddress() {
    this.addresses.forEach(element => {
      if(element.address_id == this.address_id.value)
        this.selectedAddress = element;
    });
  }

  changeCard() {
    this.cards.forEach(element => {
      if(element.card_id == this.card_id.value)
        this.selectedCard = element;
    });
  }

  placeOrder() {
    if(this.cartItems.length > 0 && !this.ordering) {
      console.log("INSIDE PLACE ORDER")
      console.log(this.ordering)
      this.ordering = true;
      let o:Order = {order_id: 1, card_id: this.card_id.value, address_id: this.address_id.value, total: this.total, order_time: new Date().toISOString().slice(0, 19).replace('T', ' ')};
      this.backendService.placeOrder(o).subscribe(response =>{
        this.ordering = false;
        console.log(response.status)
        console.log("INSIDE RESPONSE")
        console.log(response)
        if(response.status == 200) {
          this.router.navigateByUrl('/orders');
        }
      }, err => {
        console.log("INSIDE ERR")
        console.log(err)
        this.ordering = false;
        if(err.status == 400 || err.status == 409) {
          alert("Invalid Input");
        } else if(err.status == 401) {
          this.auth.logout();
        } else if(err.status == 422) {
          alert("Could not validate address");
        } else if(err.status == 500) {
          alert("Something went wrong");
          this.router.navigateByUrl("/");
        }
      })
    }
  }

}
