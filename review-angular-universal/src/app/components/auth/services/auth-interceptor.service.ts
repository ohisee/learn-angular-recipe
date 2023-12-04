import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { take, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { Store } from "@ngrx/store";

import { RecipeAppState } from "src/app/store";
import * as fromAuthUserSelector from "src/app/store/auth.selector";

/** This HttpInterceptor is provided in core.module.ts */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<RecipeAppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.store.select('userAuth')
    return this.store.select(fromAuthUserSelector.selectAuthUser).pipe(
      take(1),
      exhaustMap(user => {
        // when the user is trying to sign in, there is no user token at start
        if (!user?.token) {
          return next.handle(req);
        }
        const modifiedRequet = req.clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedRequet);
      })
    );
    // return this.authService.user$.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     // when the user is trying to sign in, there is no user token at start
    //     if (!user?.token) {
    //       return next.handle(req);
    //     }
    //     const modifiedRequet = req.clone({ params: new HttpParams().set('auth', user.token) });
    //     return next.handle(modifiedRequet);
    //   })
    // );
  }
}
