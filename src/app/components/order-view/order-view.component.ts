import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService, Order, OrderItem } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  order!:Order;
  orderItems:OrderItem[] = [];
  id!:number;

  orderForm = this.fb.group({
    user_id: [0],
    card_id: [0],
    address_id: [0],
    order_time: [''],
    total: [0],
  });

  orderItemForm = this.fb.group({
    order_id: [0],
    product_id: [0],
    quantity: [0],
    current_items: this.fb.array([])
  });

  get user_id() {
    return this.orderForm.get('user_id') as FormControl;
  }

  get card_id() {
    return this.orderForm.get('card_id') as FormControl;
  }

  get address_id() {
    return this.orderForm.get('address_id') as FormControl;
  }

  get order_time() {
    return this.orderForm.get('order_time') as FormControl;
  }

  get total() {
    return this.orderForm.get('total') as FormControl;
  }

  get product_id() {
    return this.orderItemForm.get('product_id') as FormControl;
  }

  get quantity() {
    return this.orderItemForm.get('quantity') as FormControl;
  }

  get current_items() {
    return this.orderItemForm.get('current_items') as FormArray;
  }

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

  loadOrderItems() {
    this.backendService.getOrderItems(this.order.order_id).subscribe(orderItems =>{
      this.current_items.clear();
      this.orderItems = orderItems;
      for(let item of orderItems) {
        let itemForm = this.fb.group({
          product_id: [item.product_id],
          quantity: [item.quantity]
        });
        this.current_items.push(itemForm);
      }
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getOrder(this.id).subscribe(order =>{
      if(order === undefined)
        this.router.navigate(['/orders']);
      else
        this.order = order;
      this.user_id.setValue(this.order.user_id);
      this.card_id.setValue(this.order.card_id);
      this.address_id.setValue(this.order.address_id);
      this.order_time.setValue(this.order.order_time);
      this.total.setValue(this.order.total);

      this.loadOrderItems();
    });
  }

  onUpdateSubmit() {
    if(!this.orderForm.valid){
      return;
    }
    let o:Order = {order_id: this.order.order_id, user_id: this.user_id.value, card_id: this.card_id.value, address_id: this.address_id.value, order_time: this.order_time.value, total: this.total.value};
    this.backendService.updateOrder(o).subscribe();
    this.router.navigate(['/orders']);
  }

  onDelete() {
    this.backendService.deleteOrder(this.order.order_id).subscribe();
    this.router.navigate(['/orders']);
  }

  addOrderItem() {
    let orderItem:OrderItem = {order_id: this.order.order_id, product_id: this.product_id.value, quantity: this.quantity.value};
    this.backendService.addOrderItem(orderItem).subscribe(() => this.loadOrderItems());
  }

  updateOrderItem(i: number) {
    let orderItem:OrderItem = {order_id: this.order.order_id, product_id: this.current_items.at(i).get('product_id')!.value, quantity: this.current_items.at(i).get('quantity')!.value};
    this.backendService.updateOrderItem(orderItem).subscribe(() => this.loadOrderItems());
  }

  deleteOrderItem(i: number) {
    let orderItem:OrderItem = {order_id: this.order.order_id, product_id: this.current_items.at(i).get('product_id')!.value, quantity: this.current_items.at(i).get('quantity')!.value};
    this.backendService.deleteOrderItem(orderItem).subscribe(() => this.loadOrderItems());
  }
}
