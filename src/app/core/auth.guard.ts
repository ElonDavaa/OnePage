import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.hasAuthorization()) {
      return true;
    }

    return this.router.createUrlTree(['login']);

    // return this.authService.getRolesObservable().pipe(
    //   mergeMap((val: any) => {
    //     if (this.authService.hasAuthorization()) {
    //       if (val.includes('ROLE_CUSTOMER')) {
    //         return of(this.router.createUrlTree(['customer']));
    //       }

    //       return of(true);
    //     }

    //     return of(this.router.createUrlTree(['login']));
    //   })
    // );
  }
}
