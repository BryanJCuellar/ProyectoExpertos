import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  backendHost: string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  // Obtener planes
  obtenerPlanes(): Observable<any>{
    return this.httpClient.get(`${this.backendHost}/planes`, {});
  }
}
