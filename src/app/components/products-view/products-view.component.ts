import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService, CartItem, Product } from 'src/app/services/backend-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private backendService:BackendServiceService,
    private fb:FormBuilder,
    private router: Router,
    private ar:ActivatedRoute,
    private auth:AuthService
  ) { }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getProducts(params).subscribe(response =>{
        if(response.status == 200) {
          if(response.body) {
            this.products = response.body;
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
    });
  }
  
  ngOnInit(): void {
    this.updateData();
  }

}
