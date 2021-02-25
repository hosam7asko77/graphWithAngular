import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {LaptopService} from '../laptop-service.service';
import {LaptopModel} from '../laptop-model';
import {Form, NgForm} from '@angular/forms';
import {FilterField} from '../filter-field';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  laptopId: string;
  search: string;
  laptops: LaptopModel[];
  loading = false;
  error: string;

  constructor(private apollo: Apollo, private service: LaptopService) {
  }

  ngOnInit(): void {
  }

  findLaptop(): any {
    this.error = '';
    this.loading = true;

    this.service.search(this.search).subscribe(({data, loading}) => {
      if (data.Search) {
        this.laptops = data.Search;
      } else {
        this.error = 'Laptop does not exits';
      }
      this.loading = loading;
      console.log(this.laptops);
    });
  }

  findLaptopUsingId(): any {
    this.service.findLaptop(Number(this.laptopId)).subscribe(({data, loading}) => {
        if (data.laptop) {
          let lp: LaptopModel;
          lp = data.laptop;
          const list: LaptopModel[] = [lp];
          this.laptops = list;
          console.log(data.laptop);
        } else {
          this.error = 'Laptop does not exits';
        }
        this.loading = loading;
      },
      error => {
        this.loading = false;
        this.error = error.message;
      });
  }


}
