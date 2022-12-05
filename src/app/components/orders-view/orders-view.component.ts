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
  displayedColumns:string[] = ["order_id", "card_id", "address_id", "order_time", "total"];
  dataSource!:MatTableDataSource<Order>;


  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router: Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getOrders(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.orders = response.body;
            this.dataSource.data = this.orders;
          }
        }
      });
    });
  }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#order-add-success-alert").addClass("d-none");
    })

    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getOrders(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.orders = response.body;
            this.dataSource = new MatTableDataSource<Order>(this.orders);
            this.dataSource.paginator = this.paginator;
          }
        }
      });
    });
  }

}
