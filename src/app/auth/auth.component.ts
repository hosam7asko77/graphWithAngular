import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
 email: string;
  password: string;
  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.signin(this.email, this.password);
  }
  ngOnInit(): void {
  }

}
