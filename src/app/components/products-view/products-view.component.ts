import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService, Product } from 'src/app/services/backend-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  displayedColumns:string[] = ["product_id", "name", "category", "price"];
  dataSource!:MatTableDataSource<Product>;

  productForm = this.fb.group({
    name: [''],
    category: [''],
    price: [0]
  });

  get name() {
    return this.productForm.get('name') as FormControl;
  }

  get category() {
    return this.productForm.get('category') as FormControl;
  }

  get price() {
    return this.productForm.get('price') as FormControl;
  }

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router: Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getProducts(params).subscribe(products =>{
        this.products = products;
        this.dataSource.data = this.products;
      });
    });
  }
  
  ngOnInit(): void {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getProducts(params).subscribe(products =>{
        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
      });
    });

    this.router.events.subscribe(() => this.updateData());
  }

  onSubmit() {
    if(!this.productForm.valid){
      return;
    }
    let p:Product = {product_id: Math.max(...this.products.map(product => product.product_id), 0) + 1, name: this.name.value, category: this.category.value, price: this.price.value}
    this.backendService.addProduct(p).subscribe(() => this.updateData());
  }

}
