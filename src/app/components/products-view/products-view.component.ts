import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BackendServiceService, Product } from 'src/app/services/backend-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  displayedColumns:string[] = ["product_id", "name", "category", "price"];
  dataSource!:MatTableDataSource<Product>;

  productForm = this.fb.group({
    name: [''],
    category: [''],
    price: ['']
  });

  constructor(private backendService:BackendServiceService, private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.backendService.getProducts().subscribe(products =>{
      this.products = products;
      this.dataSource = new MatTableDataSource<Product>(this.products);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    
  }

}
