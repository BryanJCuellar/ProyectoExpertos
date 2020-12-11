import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendHost: string = 'http://localhost:8888';
  dataLogin: any;

  constructor(private httpClient: HttpClient) { }

  /***Clientes***/
  // Login Usuario Cliente
  loginCliente(data): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/clientes/login`, data);
  }

  /***Empresarios***/

  /***Administradores***/

  /*Verificar login*/
  loggedIn(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('rol')) {
      return true;
    }
    return false;
  }

  loggedInClient(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('rol') == 'Cliente') {
      return true;
    }
    return false;
  }

  loggedInBusiness(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('rol') == 'Empresario') {
      return true;
    }
    return false;
  }

  loggedInAdmin(): boolean {
    if (localStorage.getItem('token') && localStorage.getItem('rol') == 'Administrador') {
      return true;
    }
    return false;
  }

  /*Cerrar Sesion*/
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    window.location.href = "/login";
  }

  setToken(): void {
    if (this.dataLogin != null) {
      localStorage.setItem('token', this.dataLogin.accessToken);
      localStorage.setItem('rol', this.dataLogin.rol);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
