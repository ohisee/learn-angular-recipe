import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user$.pipe(
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
  }
}

