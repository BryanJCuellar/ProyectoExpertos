import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  canActivate() {
    // Si existe una sesion evitar que el usuario acceda a registro o login
    if (!this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }

}
