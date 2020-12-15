import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  // backendHost: string = 'http://localhost:8888';
  backendHost: string = 'https://backend-comlign.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  // Obtener empresas
  obtenerEmpresas():Observable<any>{
    return this.httpClient.get(`${this.backendHost}/empresas`, {});
  }
  // Obtener un limite de empresas
  obtenerMuestraEmpresas():Observable<any>{
    return this.httpClient.get(`${this.backendHost}/empresas/muestra`, {});
  }

  // Guardar una empresa
  guardarEmpresa(formularioRegistro):Observable<any>{
    return this.httpClient.post(`${this.backendHost}/empresas`,formularioRegistro);
  }
}
