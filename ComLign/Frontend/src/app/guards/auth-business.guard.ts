import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthBusinessGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    if (this.authService.loggedInBusiness()) {
      return true;
    }
    window.location.href = "/login";
    return false;
  }

}
