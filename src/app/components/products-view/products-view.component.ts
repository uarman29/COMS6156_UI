import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService, CartItem, Product } from 'src/app/services/backend-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  products: Product[] = [];

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router: Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getProducts(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.products = response.body;
          }
        }
      });
    });
  }
  
  ngOnInit(): void {
    this.updateData();
  }

}
