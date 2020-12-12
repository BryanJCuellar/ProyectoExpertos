import { Component, OnInit } from '@angular/core';
import { share } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class BusinessHomeComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  isToogled: boolean = true;
  width: number = window.innerWidth;
  empresarioActual: any;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // Empresarios
    if (this.authService.getRol() == 'Empresario'){
      this.usuariosService.obtenerIDEmpresario()
      .subscribe(
        res => {
          this.sharedService.setIDUsuario(res.id);
          this.usuariosService.obtenerUsuarioEmpresaAggregate(res.id)
          .subscribe(
            user => {
              this.empresarioActual = user;
              console.log(this.empresarioActual);
              this.sharedService.loadDataUsuario(this.empresarioActual);
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

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    if (this.width < 768) {
      this.isToogled = true;
    } else {
      this.isToogled = false;
    }
  }

  activarToggle() {
    this.isToogled = !this.isToogled;
  }

}
