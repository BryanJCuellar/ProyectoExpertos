import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.formularioSesionEmpresario.reset();
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
    this.emailValido = true;
    this.passwordValido = true;
    this.nombreEmpresaValido = true;
    this.authService.loginEmpresario(this.formularioSesionEmpresario.value)
      .subscribe(
        res => {
          // console.log(res);
          if (res.mensaje == 'OK') {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('rol', res.data.rol);
            window.location.href = "/admin-companies";
          }
        },
        error => {
          // console.log(error);
          if (error.error.mensaje == 'No-Autorizado: Email no encontrado') {
            this.emailValido = false;
          }
          if (error.error.mensaje == 'No-Autorizado: Password incorrecta') {
            this.passwordValido = false;
          }
          if (error.error.mensaje == 'No-Autorizado: Empresa no encontrada') {
            this.nombreEmpresaValido = false;
          }
        }
      )
  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
