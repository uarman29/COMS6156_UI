import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  checkLoginStatus(): boolean {
    if (this.cookieService.get("Auth-Token") == "") {
      return false;
    } else {
      return true;
    }
  }

  async login(APIKey: string) {
    this.cookieService.set("Auth-Token", APIKey);
    let count = 0
    while(this.checkLoginStatus() == false) {
      this.cookieService.set("Auth-Token", APIKey);
      await new Promise(r => setTimeout(r, 1000));
      count += 1
      if (count == 5) {
        alert("Could not login")
        break
      }
    }
    window.location.href = "/";
  }

  async logout() {
    this.cookieService.delete("Auth-Token");
    while(this.checkLoginStatus() != false) {
      this.cookieService.delete("Auth-Token");
      await new Promise(r => setTimeout(r, 1000));
    }
    window.location.href = "/login";
  }

  getAPIKey() {
    return this.cookieService.get("Auth-Token");
  }
}
