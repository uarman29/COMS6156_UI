import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-addresses-view',
  templateUrl: './addresses-view.component.html',
  styleUrls: ['./addresses-view.component.css']
})
export class AddressesViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addresses: Address[] = [];
  displayedColumns:string[] = ["address_id", "user_id", "street_address", "state", "city", "zip_code"];
  dataSource!:MatTableDataSource<Address>;

  addressForm = this.fb.group({
    user_id: [, Validators.required],
    street_address: [, Validators.required],
    state: [, Validators.required],
    city: [, Validators.required],
    zip_code: [, Validators.required],
  });

  get user_id() {
    return this.addressForm.get('user_id') as FormControl;
  }

  get street_address() {
    return this.addressForm.get('street_address') as FormControl;
  }

  get state() {
    return this.addressForm.get('state') as FormControl;
  }

  get city() {
    return this.addressForm.get('city') as FormControl;
  }

  get zip_code() {
    return this.addressForm.get('zip_code') as FormControl;
  }

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router:Router, private ar:ActivatedRoute) { 
  }

  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getAddresses(params).subscribe(addresses =>{
        this.addresses = addresses;
        this.dataSource.data = this.addresses;
      });
    });
  }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#address-add-success-alert").addClass("d-none");
    })

    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getAddresses(params).subscribe(addresses =>{
        this.addresses = addresses;
        this.dataSource = new MatTableDataSource<Address>(this.addresses);
        this.dataSource.paginator = this.paginator;
      });
    });

    this.router.events.subscribe(() => this.updateData());
  }

  onSubmit() {
    if(!this.addressForm.valid){
      return;
    }
    let a:Address = {address_id: Math.max(...this.addresses.map(address => address.address_id), 0) + 1, user_id: this.user_id.value, street_address: this.street_address.value, state: this.state.value, city: this.city.value, zip_code: this.zip_code.value};
    this.backendService.addAddress(a).subscribe(() => {
      this.updateData();
      this.addressForm.reset();
      $("#address-add-success-alert").removeClass("d-none");
    });
  }
}
