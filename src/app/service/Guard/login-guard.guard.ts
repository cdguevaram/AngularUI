
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import swal from 'sweetalert2';
import { UsuarioService } from '../service.index';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {



  constructor( public usuarioService: UsuarioService,
               public router: Router,
) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    if ( this.usuarioService.estaLogueado() ) {

      return true;
    } else {

      swal.fire('error','Acceso denegado','error');
      this.router.navigate(['/login']);
      return false;
    }

  }






}
