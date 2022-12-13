import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService, private backendService:BackendServiceService) { }

  ngOnInit(): void {
  }

  async logout() {
    this.auth.logout();
  }

}
