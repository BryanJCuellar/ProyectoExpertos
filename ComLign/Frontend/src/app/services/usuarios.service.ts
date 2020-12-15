import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // backendHost: string = 'http://localhost:8888';
  backendHost: string = 'https://backend-comlign.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  /***Clientes***/

  // Obtener emails de clientes
  verificarEmailClientes(email): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/clientes/emails`, { email: email });
  }

  // Guardar Usuario Cliente
  guardarUsuarioCliente(formularioRegistro): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/clientes/signup`, formularioRegistro);
  }

  obtenerIDCliente(): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/clientes/tokenID`, {});
  }

  obtenerUsuarioCliente(idCliente): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/clientes/${idCliente}`, {});
  }

  /***Empresarios****/
  // Obtener emails de empresarios
  verificarEmailEmpresarios(email): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/empresarios/emails`, { email: email });
  }

  // Guardar Usuario Empresa
  guardarUsuarioEmpresa(formularioRegistro): Observable<any> {
    return this.httpClient.post(`${this.backendHost}/empresarios/signup`, formularioRegistro);
  }

  obtenerIDEmpresario(): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/empresarios/tokenID`, {});
  }

  obtenerUsuarioEmpresaAggregate(idEmpresario): Observable<any> {
    return this.httpClient.get(`${this.backendHost}/empresarios/${idEmpresario}`, {});
  }

  guardarPlanEmpresario(idEmpresario, idPlan, data): Observable<any> {
    return this.httpClient.put(`${this.backendHost}/empresarios/${idEmpresario}/planes/${idPlan}`, data);
  }
}
