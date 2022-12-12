import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendServiceService, Order, OrderItem } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = ["product_id", "quantity"];
  dataSource!:MatTableDataSource<OrderItem>;

  order!:Order;
  orderItems:OrderItem[] = [];
  id!:number;

  orderForm = this.fb.group({
    card_id: [0],
    address_id: [0],
    order_time: [''],
    total: [0],
  });

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

  constructor(
    private backendService:BackendServiceService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  loadOrderItems() {
    this.backendService.getOrderItems(this.order.order_id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.orderItems = response.body;
          this.dataSource.data = this.orderItems;
        }
      }
    }, err => {
      if(err.status == 400 || err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/orders");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/orders");
      }
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getOrder(this.id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.order = response.body;
          this.card_id.setValue(this.order.card_id);
          this.address_id.setValue(this.order.address_id);
          this.order_time.setValue(this.order.order_time);
          this.total.setValue(this.order.total);
          this.dataSource = new MatTableDataSource<OrderItem>(this.orderItems);
          this.dataSource.paginator = this.paginator;
          this.loadOrderItems();
        }
      }
    }, err => {
      if(err.status == 400 || err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/orders");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/orders");
      }
    });
  }

  onDelete() {
    this.backendService.deleteOrder(this.order.order_id).subscribe(response => {
      if(response.status == 200){
        this.router.navigate(['/orders']);
      }
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/orders");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/orders");
      }
    });
  }

}
