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
        this.loading = false;
        this.error = error;
      });
  }

  filterData(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const filterField = new FilterField(form.value.operation, form.value.value);
    const filterF = new FilterField('gt', '2000');
    const fieldFilter = form.value.fieldFilter;
    this.service.filterData(filterF).subscribe(({data, loading}) => {
        // @ts-ignore
        this.laptops = data && data.FilterLaptops;
        this.loading = loading;
        // @ts-ignore
        console.log(this.laptops);
      },
      error => {
        this.loading = false;
        this.error = error;
      });
  }

}
