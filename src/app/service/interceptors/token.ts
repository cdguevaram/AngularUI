import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../login/usuario.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private usuarioService: UsuarioService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const token = this.usuarioService.token;

        if ( token != null && token.length ) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(authReq);

        }
        return next.handle(req);
    }
}
