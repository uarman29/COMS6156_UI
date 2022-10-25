import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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


  constructor(private backendService:BackendServiceService, private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.backendService.getUsers().subscribe(users =>{
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    if(!this.userForm.valid){
      return;
    }
    let u:User = {user_id: Math.max(...this.users.map(user => user.user_id), 0) + 1, first_name: this.first_name.value, last_name: this.last_name.value};
    this.backendService.addUser(u).subscribe();
  }

}
