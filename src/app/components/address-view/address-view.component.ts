import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent implements OnInit {

  address!:Address;
  id!:number;

  addressForm = this.fb.group({
    street_address: [''],
    state: [''],
    city: [''],
    zip_code: [''],
  });

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

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getAddress(this.id).subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.address = response.body;
          this.street_address.setValue(this.address.street_address);
          this.state.setValue(this.address.state);
          this.city.setValue(this.address.city);
          this.zip_code.setValue(this.address.zip_code);
        }
      }
    });
  }

  onUpdateSubmit() {
    if(!this.addressForm.valid){
      return;
    }
    let a:Address = {address_id: this.address.address_id, user_id: 1, street_address: this.street_address.value, state: this.state.value, city: this.city.value, zip_code: this.zip_code.value};
    this.backendService.updateAddress(a).subscribe();
    this.router.navigate(['/addresses']);
  }

  onDelete() {
    this.backendService.deleteAddress(this.address.address_id).subscribe();
    this.router.navigate(['/addresses']);
  }

}
