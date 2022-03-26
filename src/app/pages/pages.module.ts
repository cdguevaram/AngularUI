import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';





@NgModule({
    declarations: [
        PagesComponent
    ],
    exports: [

    ],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      HttpClientModule,
      BrowserAnimationsModule,
    ],


})
export class PagesModule { }
