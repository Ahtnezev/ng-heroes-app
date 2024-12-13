import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

//? lo utilizamos en app-routing-module.ts

@Injectable({providedIn: 'root'})
// se debe implementar una de esas dos interfaces o las dos para que sea un Guard
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus() : MaybeAsync<GuardResult> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
        tap( isAuthenticated => {
            if (!isAuthenticated) this.router.navigate(['./auth/login'])
          }
        ),
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    // console.log('Can Match');
    // console.log({route, segments});
    // return false;

    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // console.log('Can activate');
    // console.log({route, state});
    // return false;

    return this.checkAuthStatus();
  }

}
