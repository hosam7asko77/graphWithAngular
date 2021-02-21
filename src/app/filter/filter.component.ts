import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {LaptopService} from '../laptop-service.service';
import {LaptopModel} from '../laptop-model';
import {NgForm} from "@angular/forms";
import {FilterField} from "../filter-field";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  laptopId: string;
  word: string;
  laptops: LaptopModel[];
  loading = false;
  error: string;
  constructor(private apollo: Apollo, private service: LaptopService) {}
  ngOnInit(): void {
  }
   findLaptop(): any {
     this.error = '';
     this.loading = true;

     this.service.search(this.word).subscribe(({data, loading}) => {
         if (data.Search) { this.laptops = data.Search; }
         else { this.error = 'Laptop does not exits'; }
         this.loading = loading;
         console.log(this.laptops);
       });
   }
   findLaptopUsingId(): any {
         this.service.findLaptop(Number(this.laptopId)).subscribe(({data, loading}) => {
         if (data.FilterLaptops) {
           let laptop: LaptopModel;
           laptop = data.Laptop;
           const list: LaptopModel[] = [laptop];
           this.laptops = list;
         }
         else { this.error = 'Laptop does not exits'; }
         this.loading = loading;
       });
   }

}
