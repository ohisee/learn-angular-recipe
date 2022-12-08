import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";

import { RecipeAppState } from "src/app/store";
import * as fromAuthUserSelector from "src/app/store/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<RecipeAppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // this.store.select('userAuth') 
    return this.store.select(fromAuthUserSelector.selectAuthUser).pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
    // return this.authService.user$.pipe(
    //   take(1),
    //   map(user => {
    //     const isAuthenticated = !!user;
    //     if (isAuthenticated) {
    //       return true;
    //     }
    //     return this.router.createUrlTree(['/auth']);
    //   })
    // );
  }
}

