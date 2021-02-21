import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {FilterField} from "./filter-field";

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor(private apollo: Apollo) { }
  public findCountLaptops(count: number): void {}
  public findAllLaptops(): any{
     return this.apollo.query({
      query: gql`query {
        Laptops{
        id,
        name,
        company,
        price,
      ram
      }
      }`
    }).pipe();
  }
  public findLaptop(id: number): any {
         return this.apollo
       .query<any>({
         query: gql`
          query($id: Int!) {
            Laptop(id: $id) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
         variables: {
           id: id
         }
       }).pipe();

  }
  public createNewLaptop(): any{}
  public search(keyWord: string): any{
             return this.apollo
       .query<any>({
         query: gql`
          query($word: String) {
            Search(word: $word) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
         variables: {
           word : keyWord
         }
       }).pipe();
  }
    public filterData(filter: FilterField): any{
             return this.apollo
       .query<any>({
         query: gql`
          query($operator: String!, $value: String!) {
            FilterLaptops(where:{price:{operator:$operator,value:$value}) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
         variables: {
           operator: filter.operator,
           value: filter.value
         }
       }).pipe();
  }
}
