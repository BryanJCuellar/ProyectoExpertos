import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  /*fecha: Date = new Date();
  dias: number = 30;*/
  emailExiste: boolean = false;

  tipoUsuarioSeleccionado: any;

  formularioAuxiliar: FormGroup;

  formularioRegistro: FormGroup;



  constructor(private usuariosService: UsuariosService, private empresasService: EmpresasService) { }

  ngOnInit(): void {
    this.formularioAuxiliar = new FormGroup({
      tipoUsuario: new FormControl('', [Validators.required])
    });
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nombreEmpresa: new FormControl(''),
      descripcionEmpresa: new FormControl('')
    });
    /*this.fecha.setDate(this.fecha.getDate() + this.dias);
    console.log(this.fecha);*/

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

  cambiarTipoUsuario(tipo) {
    this.tipoUsuarioSeleccionado = tipo;
    //Cliente
    if (tipo == "Cliente") {
      this.formularioRegistro = new FormGroup({
        nombre: new FormControl(this.nombre.value, [Validators.required, Validators.maxLength(10)]),
        apellido: new FormControl(this.apellido.value, [Validators.required, Validators.maxLength(10)]),
        email: new FormControl(this.email.value, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl(this.password.value, [Validators.required, Validators.minLength(8)]),
        nombreEmpresa: new FormControl(''),
        descripcionEmpresa: new FormControl('')
      });
    }
    //Empresa
    if (tipo == "Empresa") {
      this.formularioRegistro = new FormGroup({
        nombre: new FormControl(this.nombre.value, [Validators.required, Validators.maxLength(10)]),
        apellido: new FormControl(this.apellido.value, [Validators.required, Validators.maxLength(10)]),
        email: new FormControl(this.email.value, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl(this.password.value, [Validators.required, Validators.minLength(8)]),
        nombreEmpresa: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        descripcionEmpresa: new FormControl('', [Validators.required, Validators.maxLength(500)])
      });
    }
    //console.log(this.formularioRegistro.value);
  }

  validarDatos() {
    // Verificar si email se duplica
    this.emailExiste = false;
    // Email cliente
    this.usuariosService.obtenerEmailClientes()
      .subscribe(
        res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].email == this.email.value) {
              this.emailExiste = true;
              break;
            }
          }
          // Email empresario
          this.usuariosService.obtenerEmailEmpresarios()
            .subscribe(
              res2 => {
                for (let j = 0; j < res2.length; j++) {
                  if (res2[j].email == this.email.value) {
                    this.emailExiste = true;
                    break;
                  }
                }
                if(!this.emailExiste){
                  this.enviarFormularioRegistro();
                }
              },
              error => console.log(error)
            );
        },
        error => console.log(error)
      );
  }

  enviarFormularioRegistro() {
    if (this.tipoUsuarioSeleccionado == "Cliente") {
      this.usuariosService.guardarUsuarioCliente(this.formularioRegistro.value)
        .subscribe(
          res => {
            console.log("Respuesta del servidor", res);
            this.formularioAuxiliar.reset();
            this.formularioRegistro.reset();
            alert("REGISTRO EXITOSO");
            window.location.href = "/login/client"
          },
          error => {
            console.log(error);
          }
        );
    }
    if (this.tipoUsuarioSeleccionado == "Empresa") {
      let formularioEmpresario = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        email: this.email.value,
        password: this.password.value,
        idEmpresa: ''
      }

      this.empresasService.guardarEmpresa(this.formularioRegistro.value)
        .subscribe(
          res => {
            //idEmpresa = res._id;
            //console.log("ID de Empresa", idEmpresa);
            formularioEmpresario.idEmpresa = res._id;
            this.usuariosService.guardarUsuarioEmpresa(formularioEmpresario)
              .subscribe(
                res2 => {
                  console.log("Respuesta del servidor", res2);
                  this.formularioAuxiliar.reset();
                  this.formularioRegistro.reset();
                  alert("REGISTRO EXITOSO");
                  window.location.href = "/plans"
                },
                error => {
                  console.log('Error al guardar usuario:', error);
                }
              );
          },
          error => {
            console.log('Error al guardar empresa:', error);
          }
        );
    }
  }

  cambiarInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }



}
