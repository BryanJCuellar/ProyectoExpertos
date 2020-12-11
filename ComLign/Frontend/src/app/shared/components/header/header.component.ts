import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getAuthService(){
    return this.authService;
  }

}
