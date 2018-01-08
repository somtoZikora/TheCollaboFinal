import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
authToken: any

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authToken = localStorage.getItem('id_token');
    
    if (this.authToken != null) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.authToken)
    });
    return next.handle(authReq);
  }else{

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'skip-authenticate')
    });
    return next.handle(authReq);
  }

  }
}
