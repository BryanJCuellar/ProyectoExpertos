import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactomailService {

  constructor(private httpClient: HttpClient) { }

  enviarCorreo(formularioContacto):Observable<any>{
    return this.httpClient.post('http://localhost:8888/mails',formularioContacto);
  }
}
