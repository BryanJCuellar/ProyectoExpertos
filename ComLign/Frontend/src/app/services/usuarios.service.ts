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

  // Obtener emails de clientes
  obtenerEmailClientes(): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/clientes/emails`, {});
  }

  // Guardar Usuario Cliente
  guardarUsuarioCliente(formularioRegistro): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/clientes/signup`, formularioRegistro);
  }

  /***Empresarios****/
  // Obtener emails de empresarios
  obtenerEmailEmpresarios(): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/empresarios/emails`, {});
  }

  // Guardar Usuario Empresa
  guardarUsuarioEmpresa(formularioRegistro): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/empresarios/signup`, formularioRegistro);
  }
}
