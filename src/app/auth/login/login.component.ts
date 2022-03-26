
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';

import { Router } from '@angular/router';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/* import { environment } from '../../../environments/environment'; */
import { environment } from '../../../environments/environment';
import { UsuarioService } from 'src/app/service/login/usuario.service';
import { LoginGuardGuard } from 'src/app/service/Guard/login-guard.guard';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    userName: new FormControl('',Validators.required),
    passName: new FormControl('',Validators.required),
  });

  constructor( private builder: FormBuilder,
              public usuarioService: UsuarioService, private router: Router,

               private logiGuard: LoginGuardGuard) {



  }


  ngOnInit() {
  }

  get passNovalido(){
    return this.loginForm.get('passName')?.invalid && this.loginForm.get('passName')?.touched;
  }
  get userNovalido(){
    return this.loginForm.get('userName')?.invalid && this.loginForm.get('userName')?.touched;
  }

  login(){
    if(true){
       const datosForm= this.loginForm.getRawValue();
        this.usuarioService.login({userName:datosForm.userName, password:datosForm.passName}).subscribe({
          next:(data:any)=>{
            swal.fire('login','Inicio de sesion satisfactorio', 'info');

            this.usuarioService.guardarUsuario(data.token);
            this.router.navigate(['/dashboard']);
          },
          error:(error:any)=>{
            if(error.error !== undefined && error.error.Message !== undefined){
              swal.fire('login',error.error.Message, 'error');
            }else{
              swal.fire('login','Error al inicio de sesion', 'error');
            }
          }
        })
    }
  }

}
