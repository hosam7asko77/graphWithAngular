import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FilterComponent} from './filter/filter.component';
import {HomeComponent} from './home/home.component';
import {CreateComponent} from './create/create.component';



const routes: Routes = [
  { path: 'filter', component: FilterComponent },
  { path: 'create', component: CreateComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
