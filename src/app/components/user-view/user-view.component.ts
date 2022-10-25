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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getUser(this.id).subscribe(user =>{
      if(user === undefined)
        this.router.navigate(['/users']);
      else
        this.user = user;
      this.first_name.setValue(this.user.first_name);
      this.last_name.setValue(this.user.last_name);
    });
  }

  onUpdateSubmit() {
    if(!this.userForm.valid){
      return;
    }
    let u:User = {user_id: this.user.user_id, first_name: this.first_name.value, last_name: this.last_name.value};
    this.backendService.updateUser(u).subscribe();
    this.router.navigate(['/users']);
  }

  onDelete() {
    this.backendService.deleteUser(this.user.user_id).subscribe();
    this.router.navigate(['/users']);
  }
}
