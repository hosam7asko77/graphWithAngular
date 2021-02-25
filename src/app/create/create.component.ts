import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LaptopService} from '../laptop-service.service';
import {LaptopModel} from '../laptop-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  laptopId: string;
  search: string;
  laptops: LaptopModel[];
  loading = false;
  error: string;
  message: string;
  constructor(private service: LaptopService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formAdd: NgForm): void {

    const model = new LaptopModel(null,
      formAdd.value.laptopName,
      formAdd.value.company,
      Number(formAdd.value.price),
      Number(formAdd.value.ram));
    this.service.createLaptop(model).subscribe(({data, loading}) => {
        if (data.createLaptop) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Laptop does not exits';
        }
        this.loading = loading;
      },
      error => {
        this.message = error.message;
        this.loading = false;
        this.error = error.message;
      });
  }
}
