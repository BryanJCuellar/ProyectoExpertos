import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  dataPerPage: number; 
  pageActual: number = 1;
  empresas: any = [];
  constructor(
    private empresasService: EmpresasService
  ) { }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(){
    this.empresasService.obtenerEmpresas()
    .subscribe(
      res => {
        // console.log(res);
        if(res.length < 8){
          this.dataPerPage = res.length
        } else {
          this.dataPerPage = 8;
        }
        this.empresas = res;
      },
      error => console.log(error)
    )
  }
}
