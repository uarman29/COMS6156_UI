import {HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  disabled: boolean = true;
  constructor(private backend:BackendServiceService, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let token  = params["token"]
      if(token) {
        this.auth.login(token)
      }
    });
  }

  onLogin() {
    this.backend.login();
  }

  onLogout() {
    this.backend.logout();
  }

}
