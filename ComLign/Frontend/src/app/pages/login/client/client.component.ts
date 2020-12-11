import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  emailValido: boolean = true;
  passwordValido: boolean = true;

  formularioSesionCliente = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.formularioSesionCliente.reset();
  }

  get email() {
    return this.formularioSesionCliente.get('email');
  }
  get password() {
    return this.formularioSesionCliente.get('password');
  }



  iniciarSesionCliente() {
    this.emailValido = true;
    this.passwordValido = true;
    this.authService.loginCliente(this.formularioSesionCliente.value)
    .subscribe(
      res => {
        console.log(res);
        if(res.mensaje == 'OK'){
          this.authService.dataLogin = res.data;
          this.authService.setToken();
          console.log(this.authService.dataLogin);
          //window.location.href = "/home";
        }
      },
      error => {
        console.log(error);
        if(error.error.mensaje == 'No-Autorizado: Email no encontrado'){
          this.emailValido = false;
        }
        if(error.error.mensaje == 'No-Autorizado: Password incorrecta'){
          this.passwordValido = false;
        }
      }
    )

  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
