import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private idUsuario = new BehaviorSubject<any>(null);
  private dataUsuario = new BehaviorSubject<any>(null);
  private dataPlan = new BehaviorSubject<any>(null);

  constructor() { }

  setIDUsuario(ID) {
    this.idUsuario.next(ID);
  }

  loadDataUsuario(usuario) {
    this.dataUsuario.next(usuario);
  }

  loadDataPlan(plan) {
    this.dataPlan.next(plan);
  }

  getIDUsuario(): Observable<any> {
    return this.idUsuario.asObservable();
  }

  getDataUsuario(): Observable<any> {
    return this.dataUsuario.asObservable();
  }

  getDataPlan(): Observable<any> {
    return this.dataPlan.asObservable();
  }
}
