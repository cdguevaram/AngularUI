import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { map, catchError, tap, multicast } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';



/* const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; */


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  headers = new Headers();


  usuario: any = null;
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  public get usuarios(): any {
    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && this.getStorage('usuario') != null ) {
      this.usuario = JSON.parse(this.getStorage('usuario')) ;
      return this.usuario;
    }
    return  {user: null}

  }
  public get tokens(): string {
    if (this.token != null) {
      return this.token;
    } else if (this.token == null && sessionStorage.getItem('token') != null ) {
      this.token = this.getStorage('token');
      return this.token;
    }
    return '';
  }

  login(usuario: any) {
    const urlEndpoint  = '/api';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    /* console.warn(params.toString()); */
    return this.http.post<any>(urlEndpoint + '/Auth', usuario, { headers: httpHeaders });


  }
  estaLogueado() {
    const tocket = sessionStorage.getItem("token");
    this.token=tocket==null?'':tocket;
    return ( this.token.length > 5 ) ? true : false;

  }

  getStorage(key: string){
    const valor = sessionStorage.getItem(key);
    return valor == null?'': valor;
  }
  cargarStorage() {

    if ( sessionStorage.getItem('token') ) {
      this.token = this.getStorage('token');
      this.usuario = JSON.parse( this.getStorage('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }
  guardarUsuario(accessToken: string): void {


    this.usuario = {
    token: accessToken}

    /* console.warn(this.usuario.rol); */
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    sessionStorage.setItem('token', accessToken);


  }

  guardarToken(accessToken: string): void {
    this.token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;

  }

  logout(): void {
    this.token = '';
    this.usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    /* window.location.href = 'https://test7.mh.gob.sv/loginsv/exit?referer=https://localhost:4200';
    this.router.navigate(['/login']); */



  }

}
