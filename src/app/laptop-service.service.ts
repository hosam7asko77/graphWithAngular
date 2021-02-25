import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {FilterField} from './filter-field';
import {GraphQLObjectType} from 'graphql';
import {LaptopModel} from './laptop-model';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor(private apollo: Apollo) {
  }

  public findCountLaptops(count: number): void {
  }

  public findAllLaptops(): any {
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
          query($id: ID!) {
            laptop(id: $id) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          id
        }
      }).pipe();

  }

  public createNewLaptop(): any {
  }

  public search(keyWord: string): any {
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
          word: keyWord
        }
      }).pipe();
  }

  sortData(field: string, order: string): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($orderBy: LaptopSortInput!) {
            SortedLaptops(sort:$orderBy) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          orderBy: {
            field,
            order
          }
        }
      }).pipe();
  }

  pageData(page: number, size: number, field: string, order: string): any {
    return this.apollo
      .query<any>({
        query: gql`
            query($page: Int!,$size: Int!,$sort: LaptopSortInput!) {
            LaptopPagination(page:$page,size:$size,sort:$sort) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          page,
          size,
          sort: {
            field,
            order
          }
        }
      }).pipe();
  }

  public filterByName(filter: FilterField): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($where: LaptopFilterInput!) {
            FilterLaptops(where:$where) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          where: {
            name: {
              operator: filter.operator,
              value: filter.value
            }
          }
        }
      }).pipe();
  }

  public filterById(filter: FilterField): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($where: LaptopFilterInput!) {
            FilterLaptops(where:$where) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          where: {
            id: {
              operator: filter.operator,
              value: filter.value
            }
          }
        }
      }).pipe();
  }

  public filterByPrice(filter: FilterField): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($where: LaptopFilterInput!) {
            FilterLaptops(where:$where) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          where: {
            price: {
              operator: filter.operator,
              value: filter.value
            }
          }
        }
      }).pipe();
  }

  public filterByCompany(filter: FilterField): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($where: LaptopFilterInput!) {
            FilterLaptops(where:$where) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          where: {
            company: {
              operator: filter.operator,
              value: filter.value
            }
          }
        }
      }).pipe();
  }

  public filterByRam(filter: FilterField): any {
    return this.apollo
      .query<any>({
        query: gql`
          query($where: LaptopFilter!) {
            FilterLaptops(where:$where) {
                id,
                name,
                company,
                price,
                ram
              }
          }
        `,
        variables: {
          where: {
            ram: {
              operator: filter.operator,
              value: filter.value
            }
          }
        }
      }).pipe();
  }

  createLaptop(laptopModel: LaptopModel): any {
            const create = gql`
          mutation createLaptop($name: String!, $company: String!, $price: Int!, $ram: Int!) {
             createLaptop(name: $name, company: $company, price: $price, ram: $ram) {
              id
              name
              company
              price
              ram
            }
          }
        `;
            return this.apollo
      .mutate({
        mutation: create,
        variables: {
          name: laptopModel.name,
          company: laptopModel.company,
          price: laptopModel.price,
          ram: laptopModel.ram
        }
      }).pipe();
  }
}
