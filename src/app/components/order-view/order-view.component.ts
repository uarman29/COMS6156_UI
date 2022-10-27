import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

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

      this.backendService.getOrderItems(this.order.order_id).subscribe(orderItems =>{
        this.orderItems = orderItems;
      });
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
}
