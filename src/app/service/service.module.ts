import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './service.index';
import { LoginGuardGuard } from './Guard/login-guard.guard';
import { authorsBooksServices } from './authorsBooks/authorsBooks.service';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers: [

    UsuarioService,
    LoginGuardGuard,
    authorsBooksServices


  ]
})
export class ServiceModule { }
