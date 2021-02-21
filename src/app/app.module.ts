import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {GraphqlModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {FilterComponent} from './filter/filter.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FilterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    GraphqlModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
