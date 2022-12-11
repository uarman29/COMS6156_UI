import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService, User } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  user!:User;
  id!:number;

  userForm = this.fb.group({
    first_name: [''],
    last_name: ['']
  });

  get first_name() {
    return this.userForm.get('first_name') as FormControl;
  }

  get last_name() {
    return this.userForm.get('last_name') as FormControl;
  }

  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.backendService.getUser().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.user = response.body;
        } else {
          this.router.navigate(['/']);
        }
        this.first_name.setValue(this.user.first_name);
        this.last_name.setValue(this.user.last_name);
      }
    });
  }

  onUpdateSubmit() {
  }

  onDelete() {
  }
}
