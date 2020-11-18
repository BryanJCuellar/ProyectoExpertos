import { Component, OnInit } from '@angular/core';
//import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
/*import * as $ from 'jquery';*/

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class BusinessHomeComponent implements OnInit {
  isToogled: boolean = true;
  width: number = window.innerWidth;

  constructor() { }

  ngOnInit(): void {
    //Toggle Click Function
    /*$("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });*/
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
