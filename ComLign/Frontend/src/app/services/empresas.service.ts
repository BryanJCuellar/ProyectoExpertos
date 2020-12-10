import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  backendHost: string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  // Guardar una empresa
  guardarEmpresa(formularioRegistro):Observable<any>{
    return this.httpClient.post(`${this.backendHost}/empresas`,formularioRegistro);
  }
}
