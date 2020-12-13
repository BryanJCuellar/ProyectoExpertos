import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-plan-payment',
  templateUrl: './plan-payment.component.html',
  styleUrls: ['./plan-payment.component.css']
})
export class PlanPaymentComponent implements OnInit {
  meses: any = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre']
  anios: any = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  planSeleccionado: any;
  formularioPlan = new FormGroup({
    nombreTarjeta: new FormControl('', [Validators.required]),
    numeroTarjeta: new FormControl('', [Validators.required]),
    mesVencimiento: new FormControl('', [Validators.required]),
    anioVencimiento: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.sharedService.getDataPlan()
      .subscribe(
        res => {
          this.planSeleccionado = res;
          if (this.planSeleccionado == null) {
            this.router.navigate(['/plans']);
          }
        },
        error => console.log(error)
      )
  }

   //Metodos get
   get nombreTarjeta() {
    return this.formularioPlan.get('nombreTarjeta');
  }

  get numeroTarjeta() {
    return this.formularioPlan.get('numeroTarjeta');
  }

  get mesVencimiento() {
    return this.formularioPlan.get('mesVencimiento');
  }

  get anioVencimiento() {
    return this.formularioPlan.get('anioVencimiento');
  }

  comprarPlan(){
    this.usuariosService.obtenerIDEmpresario()
    .subscribe(
      res => {
        this.usuariosService.guardarPlanEmpresario(res.id, this.planSeleccionado._id, this.formularioPlan.value)
        .subscribe(
          success => {
            if(success.ok === 1){
              alert("Plan comprado con exito");
              this.router.navigate(['/admin-companies']);
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
}
