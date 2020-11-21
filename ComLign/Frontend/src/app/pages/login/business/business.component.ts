import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  emailValido: boolean = true;
  passwordValido: boolean = true;
  nombreEmpresaValido: boolean = true;

  formularioSesionEmpresario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    nombreEmpresa: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  get email() {
    return this.formularioSesionEmpresario.get('email');
  }
  get password() {
    return this.formularioSesionEmpresario.get('password');
  }
  get nombreEmpresa() {
    return this.formularioSesionEmpresario.get('nombreEmpresa');
  }

  iniciarSesionEmpresario() {

  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
