import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private idUsuario = new BehaviorSubject<any>(null);
  private dataUsuario = new BehaviorSubject<any>(null);

  constructor() { }

  setIDUsuario(ID) {
    this.idUsuario.next(ID);
  }

  loadDataUsuario(usuario) {
    this.dataUsuario.next(usuario);
  }

  getIDUsuario(): Observable<any> {
    return this.idUsuario.asObservable();
  }

  getDataUsuario(): Observable<any> {
    return this.dataUsuario.asObservable();
  }
}
