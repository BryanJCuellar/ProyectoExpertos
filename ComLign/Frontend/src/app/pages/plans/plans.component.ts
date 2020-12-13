import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/services/planes.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planes: any = [];
  constructor(
    private planesService: PlanesService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.planesService.obtenerPlanes()
      .subscribe(
        res => {
          this.planes = res;
        },
        error => console.log(error)
      )
  }

  seleccionarPlan(plan) {
    this.sharedService.loadDataPlan(plan);
    this.router.navigate(['/plans/payment']);
  }

}
