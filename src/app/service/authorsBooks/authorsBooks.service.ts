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

export class authorsBooksServices {

  headers = new Headers();


  usuario: any = null;
  token: string = '';


  urlbase: string ='/api';

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
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

  public getAllUthors(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.urlbase + '/BooksAuthorsApi/GetAuthors',{headers: httpHeaders});
  }

  public getBookFiltered(params:any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const stringQuery ='?author=' +params.author + '&fechaI=' + params.fechaI + '&fechaF=' + params.fechaF;
    return this.http.get(this.urlbase + '/BooksAuthorsApi/GetFilteredBooks' + stringQuery,{headers: httpHeaders});
  }


  public SyncAuthors(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.urlbase + '/BooksAuthorsApi/SyncAuthros' ,{headers: httpHeaders});
  }

  public SyncBooks(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.urlbase + '/BooksAuthorsApi/SynckBooks' ,{headers: httpHeaders});
  }

}
