import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
constructor(private apollo: Apollo) {
    if (localStorage.getItem('token')) { this.isAuthenticated.next(true); }
    else { this.isAuthenticated.next(false); }
  }

  signin(email: string, password: string): any {
        const signin = gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
        `;
        this.apollo
      .mutate({
        mutation: signin,
        variables: { email, password }
      })
      .subscribe(
        ({ data }) => {
          // @ts-ignore
          localStorage.setItem('token', data.login.token);
          // localStorage.setItem('role', data.login.roles);
          this.isAuthenticated.next(true);
          window.location.href = '/';
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  signout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    window.location.href = '/';
  }
}
