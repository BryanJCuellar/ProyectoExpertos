import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  emailValido: boolean = true;
  passwordValido: boolean = true;
  codigoAdministradorValido: boolean = true;

  formularioSesionAdministrador = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    codigoAdministrador: new FormControl('', [Validators.required, Validators.minLength(12)])
  });

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  get email() {
    return this.formularioSesionAdministrador.get('email');
  }
  get password() {
    return this.formularioSesionAdministrador.get('password');
  }
  get codigoAdministrador() {
    return this.formularioSesionAdministrador.get('codigoAdministrador');
  }

  iniciarSesionAdministrador() {
    //this.formularioSesionAdministrador.reset();
  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
