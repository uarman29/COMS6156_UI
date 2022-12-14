import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    email: [''],
    name: [''],
  });

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get name() {
    return this.userForm.get('name') as FormControl;
  }

  constructor(
    private backendService:BackendServiceService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.backendService.getUser().subscribe(response =>{
      if(response.status == 200) {
        if(response.body) {
          this.user = response.body;
        } else {
          this.router.navigate(['/']);
        }
        this.email.setValue(this.user.email);
        this.name.setValue(this.user.name);
      }
    }, err => {
      if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }

  onUpdateSubmit() {
    if(!this.userForm.valid){
      return;
    }
    let u:User = {user_id: this.user.user_id, email: this.user.email, name: this.name.value};
    this.backendService.updateUser(u).subscribe(response => {
      if(response.status == 200){
        alert("User info updated");
        this.router.navigate(['/user']);
      }
    }, err => {
      if(err.status == 400) {
        alert("Invalid input");
      } else if(err.status == 401) {
        this.auth.logout();
      } else if(err.status == 403 || err.status == 404) {
        this.router.navigateByUrl("/");
      } else if(err.status == 500) {
        alert("Something went wrong");
        this.router.navigateByUrl("/");
      }
    });
  }
}
