import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  backendHost: string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  /***Clientes***/

  //Guardar Usuario Cliente
  guardarUsuarioCliente(formularioRegistro):Observable<any>{
    return this.httpClient.post(`${this.backendHost}/usuarios/clientes`,formularioRegistro);
  }

  /***Empresarios****/
  //Guardar Usuario Empresa
  guardarUsuarioEmpresa(formularioRegistro):Observable<any>{
    return this.httpClient.post(`${this.backendHost}/usuarios/empresas`,formularioRegistro);
  }
}
