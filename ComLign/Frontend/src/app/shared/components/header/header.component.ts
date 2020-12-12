import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  clienteActual: any;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    // Clientes
    if (this.authService.getRol() == 'Cliente') {
      this.usuariosService.obtenerIDCliente()
        .subscribe(
          res => {
            this.sharedService.setIDUsuario(res.id);
            this.usuariosService.obtenerUsuarioCliente(res.id)
              .subscribe(
                user => {
                  this.clienteActual = user;
                  // this.sharedService.loadDataUsuario(user);
                },
                error => console.log(error)
              )

          },
          error => console.log(error)
        )
    }
  }

  getAuthService() {
    return this.authService;
  }

}
