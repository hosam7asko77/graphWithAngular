import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';

const uri = 'http://localhost:8787/graphql'; // <-- add the URL of the GraphQL server here
// tslint:disable-next-line:typedef
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
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
