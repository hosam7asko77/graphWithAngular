import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  signout(): void {
    this.authService.signout();
  }

  ngOnInit(): void {
  }

}
