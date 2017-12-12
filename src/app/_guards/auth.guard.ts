import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _AuthenticationService: AuthenticationService,
  private _router: Router ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._AuthenticationService.loggedIn()) {
      return true;
    }else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
