import {Component, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {LaptopModel} from '../laptop-model';
import {LaptopService} from '../laptop-service.service';
import {NgForm} from '@angular/forms';
import {FilterField} from '../filter-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  laptops: LaptopModel[];
  loading = true;
  error: any;
  message: string;

  constructor(private apollo: Apollo, private service: LaptopService) {
  }

  ngOnInit(): void {
    this.service.findAllLaptops().subscribe(({data, loading}) => {
        // @ts-ignore
        this.laptops = data && data.Laptops;
        this.loading = loading;
        // @ts-ignore
        console.log(this.laptops);
      },
      error => {
      this.message = this.error.message;
      this.loading = false;
      this.error = error;
      });
  }

  filterData(form: NgForm): void {
    if (!form.valid){
      this.error = 'please enter on search box';
      console.log(this.error);
      return;
    }
    let by: any;
    console.log(form.value.filterBy);
    const filterField = new FilterField(form.value.operation, form.value.keyFilter);
    console.log(filterField.value + ' ' + filterField.operator);
    switch (form.value.filterBy) {
      case 'id':
        by = this.service.filterById(filterField);
        break;
      case 'name':
        by = this.service.filterByName(filterField);
        break;
      case 'price':
        by = this.service.filterByPrice(filterField);
        break;
      case 'company':
        by = this.service.filterByCompany(filterField);
        break;
      case 'ram':
        by = this.service.filterByRam(filterField);
        break;
    }
    by.subscribe(({data, loading}) => {
        // @ts-ignore
        this.laptops = data && data.FilterLaptops;
        this.loading = loading;
        // @ts-ignore
        console.log(this.laptops);
      },
      error => {
      this.message = this.error.message;
      this.loading = false;
      this.error = error;
      });
  }
  sortData(form: NgForm): void{
    console.log();
    this.service.sortData(form.value.sortBy, form.value.orderBy).subscribe(({data, loading}) => {
        // @ts-ignore
        this.laptops = data && data.SortedLaptops;
        this.loading = loading;
        // @ts-ignore
        console.log(this.laptops);
      },
      error => {
      this.message = this.error.message;
      this.loading = false;
      this.error = error;
      });
  }
   pageData(form: NgForm): void{
        this.service.pageData(form.value.page, form.value.sizeData, form.value.sortBy, form.value.orderBy).subscribe(({data, loading}) => {
        // @ts-ignore
        this.laptops = data && data.LaptopPagination;
        this.loading = loading;
        // @ts-ignore
        console.log(this.laptops);
      },
      error => {
          this.message = this.error.message;
          this.loading = false;
          this.error = error;
      });
  }
}
