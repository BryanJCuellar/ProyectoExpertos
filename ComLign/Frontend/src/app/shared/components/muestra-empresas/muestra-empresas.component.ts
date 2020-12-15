import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-muestra-empresas',
  templateUrl: './muestra-empresas.component.html',
  styleUrls: ['./muestra-empresas.component.css']
})
export class MuestraEmpresasComponent implements OnInit {
  muestraEmpresas: any = [];
  constructor(
    private empresasService: EmpresasService
  ) { }

  ngOnInit(): void {
    this.cargarMuestraEmpresas();
  }

  cargarMuestraEmpresas(){
    this.empresasService.obtenerMuestraEmpresas()
    .subscribe(
      res => {
        this.muestraEmpresas = res;
      },
      error => console.log(error)
    )
  }

}
