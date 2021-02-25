import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {ApolloLink} from 'apollo-link';
import { setContext } from 'apollo-link-context';

const uri = 'http://localhost:7878/graphql'; // <-- add the URL of the GraphQL server here
// tslint:disable-next-line:typedef
export function createApollo(httpLink: HttpLink) {
    const token = localStorage.getItem('token');
    const auth = setContext((operation, context) => {
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

    const link = ApolloLink.from([auth, httpLink.create({ uri })]);
    return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }],
  exports: [
      ApolloModule,
      HttpLinkModule]
})
export class GraphqlModule { }
