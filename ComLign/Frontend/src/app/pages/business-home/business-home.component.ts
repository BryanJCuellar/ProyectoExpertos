import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
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
