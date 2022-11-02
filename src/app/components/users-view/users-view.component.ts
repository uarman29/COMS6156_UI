import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendServiceService, User } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  users: User[] = [];
  displayedColumns:string[] = ["user_id", "first_name", "last_name"];
  dataSource!:MatTableDataSource<User>;
  //dataSubscription!: Subscription;

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


  constructor(private backendService:BackendServiceService, private fb:FormBuilder, private router:Router, private ar: ActivatedRoute) { 
  }
  
  updateData() {
    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getUsers(params).subscribe(users =>{
        this.users = users;
        this.dataSource.data = this.users;
      });
    })
  }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#user-add-success-alert").addClass("d-none");
    });

    this.ar.queryParamMap.subscribe(params =>{
      this.backendService.getUsers(params).subscribe(users =>{
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      });
    });
    

    this.router.events.subscribe(() => {
      this.updateData();
      //this.dataSubscription.unsubscribe();
    });

    // this.dataSubscription = interval(1000).subscribe(() => {
    //   this.updateData();
    // });
  }

  // ngOnDestory(): void {
  //   console.log("DESTROYED");
  //   this.dataSubscription.unsubscribe();
  // }


  onSubmit() {
    if(!this.userForm.valid){
      return;
    }
    let u:User = {user_id: Math.max(...this.users.map(user => user.user_id), 0) + 1, first_name: this.first_name.value, last_name: this.last_name.value};
    this.backendService.addUser(u).subscribe(() => {
      this.updateData();
      this.userForm.reset();
      $("#user-add-success-alert").removeClass("d-none");
    });
  }

}
