import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService, Order } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orders: Order[] = [];
  displayedColumns:string[] = ["order_id", "user_id", "card_id", "address_id", "order_time", "total"];
  dataSource!:MatTableDataSource<Order>;

  orderForm = this.fb.group({
    user_id: [, Validators.required],
    card_id: [, Validators.required],
    address_id: [, Validators.required],
    order_time: [, Validators.required],
    total: [, Validators.required],
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


  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router: Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getOrders(params).subscribe(orders =>{
        this.orders = orders;
        this.dataSource.data = this.orders;
      });
    });
  }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#order-add-success-alert").addClass("d-none");
    })

    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getOrders(params).subscribe(orders =>{
        this.orders = orders;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      });
    });

    this.router.events.subscribe(() => this.updateData());
  }

  onSubmit() {
    if(!this.orderForm.valid){
      return;
    }
    let o:Order = {order_id: Math.max(...this.orders.map(order => order.order_id), 0) + 1, user_id: this.user_id.value, card_id: this.card_id.value, address_id: this.address_id.value, order_time: this.order_time.value, total: this.total.value};
    this.backendService.addOrder(o).subscribe(() => {
      this.updateData();
      this.orderForm.reset();
      $("#order-add-success-alert").removeClass("d-none");
    });
  }
}
