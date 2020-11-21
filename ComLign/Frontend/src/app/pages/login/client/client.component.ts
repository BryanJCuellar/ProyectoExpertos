import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  emaiValido: boolean = true;
  passwordValido: boolean = true;

  formularioSesionCliente = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private httpClient: HttpClient) { }

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

  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
