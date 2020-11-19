import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  tipoUsuarioSeleccionado: any;

  formularioAuxiliar = new FormGroup({
    tipoUsuario: new FormControl('', [Validators.required])
  });

  formularioRegistro = new FormGroup({
    tipoUsuario: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    nombreEmpresa: new FormControl(''),
    descripcionEmpresa: new FormControl(''),
    codigoAdministrador: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  //Metodos get
  get tipoUsuario() {
    return this.formularioAuxiliar.get('tipoUsuario');
  }
  get nombre() {
    return this.formularioRegistro.get('nombre');
  }
  get apellido() {
    return this.formularioRegistro.get('apellido');
  }
  get email() {
    return this.formularioRegistro.get('email');
  }
  get password() {
    return this.formularioRegistro.get('password');
  }
  get nombreEmpresa() {
    return this.formularioRegistro.get('nombreEmpresa');
  }
  get descripcionEmpresa() {
    return this.formularioRegistro.get('descripcionEmpresa');
  }
  get codigoAdministrador() {
    return this.formularioRegistro.get('codigoAdministrador');
  }

  cambiarTipoUsuario(tipo) {
    this.tipoUsuarioSeleccionado = tipo;
    //Cliente
    if (tipo == "Cliente") {
      this.formularioRegistro = new FormGroup({
        tipoUsuario: new FormControl(tipo, [Validators.required]),
        nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        apellido: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        nombreEmpresa: new FormControl(''),
        descripcionEmpresa: new FormControl(''),
        codigoAdministrador: new FormControl('')
      });
    }
    //Empresa
    if (tipo == "Empresa") {
      this.formularioRegistro = new FormGroup({
        tipoUsuario: new FormControl(tipo, [Validators.required]),
        nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        apellido: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        nombreEmpresa: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        descripcionEmpresa: new FormControl('', [Validators.required, Validators.maxLength(500)]),
        codigoAdministrador: new FormControl('')
      });
    }
    //Admin
    if (tipo == "Administrador") {
      this.formularioRegistro = new FormGroup({
        tipoUsuario: new FormControl(tipo, [Validators.required]),
        nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        apellido: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        nombreEmpresa: new FormControl(''),
        descripcionEmpresa: new FormControl(''),
        codigoAdministrador: new FormControl('', [Validators.required])
      });
    }
    //console.log(tipo);
    //console.log(this.formularioRegistro.value);
  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }



}
