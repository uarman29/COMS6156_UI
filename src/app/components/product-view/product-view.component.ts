import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService, Product } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product!:Product;
  id!:number;

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

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getProduct(this.id).subscribe(product =>{
      if(product === undefined)
        this.product = {product_id:-1, name:'', category:'', price:0};
      else
        this.product = product;
      this.name.setValue(this.product.name);
      this.category.setValue(this.product.category);
      this.price.setValue(this.product.price);
    });
  }

  onUpdateSubmit() {
    if(!this.productForm.valid){
      return;
    }
    let p:Product = {product_id: this.product.product_id, name: this.name.value, category: this.category.value, price: this.price.value};
    this.backendService.updateProduct(p);
  }

  onDelete() {
    this.backendService.deleteProduct(this.product.product_id);
  }

}
