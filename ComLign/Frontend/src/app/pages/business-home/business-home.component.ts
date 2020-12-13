import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  formEditorQuill: FormGroup;
  editorStyle = {
    height: '300px'
  };
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [] }, { 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'color': [] },
      { 'background': [] }],
      [{ 'script': 'super' }, { 'script': 'sub' }, 'code-block'],
      ['image', 'video'],
    ]
  };
  editorOutput: string;


  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.formEditorQuill = new FormGroup({
      editor: new FormControl('')
    });
    // Empresarios
    if (this.authService.getRol() == 'Empresario') {
      this.usuariosService.obtenerIDEmpresario()
        .subscribe(
          res => {
            this.sharedService.setIDUsuario(res.id);
            this.usuariosService.obtenerUsuarioEmpresaAggregate(res.id)
              .subscribe(
                user => {
                  this.empresarioActual = user;
                  this.sharedService.loadDataUsuario(this.empresarioActual);
                },
                error => console.log(error)
              )
          },
          error => console.log(error)
        )
    }
  }

  get editor() {
    return this.formEditorQuill.get('editor');
  }

  getAuthService() {
    return this.authService;
  }

  onSubmit() {
    this.editorOutput = this.editor.value;
    // console.log(this.editor.value);
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
