import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, Observable, of } from "rxjs";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import * as fromAuthActions from "./auth.actions";
import { User } from "src/app/components/auth/model/user.model";
import { AuthService } from "src/app/shared/services/auth.service";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface UserData {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string,
};

const API_KEY = environment.firebaseApiKey;
const SIGNUP_API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

/** Effects */
@Injectable()
export class AuthEffects {
  readonly authLogin$: Observable<fromAuthActions.AuthenticateSuccessAction | fromAuthActions.AuthenticateFailAction> =
    createEffect(() => {
      return this.actions$.pipe(
        ofType(fromAuthActions.LOGIN_START),
        map((action: fromAuthActions.LoginStartAction) => action.payload),
        switchMap((payload: { email: string, password: string }) => {
          return this.httpClient.post<AuthResponseData>(SIGNIN_API_URL, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }).pipe(
            tap(responseData => {
              this.authService.setLogoutTimer(Number(responseData.expiresIn) * 1000);
            }),
            map(responseData => {
              return this.handleAuthentication(responseData);
            }),
            catchError(errorResponse => {
              return this.handleError(errorResponse);
            }),
          );
        }),
      );
    });

  readonly authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.SIGNUP_START),
      map((action: fromAuthActions.SignupStartAction) => action.payload),
      switchMap((payload: { email: string, password: string }) => {
        return this.httpClient.post<AuthResponseData>(SIGNUP_API_URL, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }).pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(Number(responseData.expiresIn) * 1000);
          }),
          map(responseData => {
            return this.handleAuthentication(responseData);
          }),
          catchError(errorResponse => {
            return this.handleError(errorResponse);
          }),
        );
      }),
    );
  });

  readonly authRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AUTHENTICATE_SUCCESS), // can put multiple actions in ofType
      tap((action: fromAuthActions.AuthenticateSuccessAction) => {
        console.log('auth redirect', action.payload.redirect);
        if (action.payload.redirect) {
          console.log('auth redirect');
          this.router.navigate(['/recipes']);
        }
      })
    );
  }, { dispatch: false });

  readonly autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AUTO_LOGIN),
      map(() => {

        console.log('start auto login');

        const userDataStr = sessionStorage.getItem('userData');

        console.log('userData checked');

        if (!userDataStr) {

          console.log('userData not found');

          return new fromAuthActions.MissingUserDataAction();
        }

        const userData: UserData = JSON.parse(userDataStr);
        const signedInUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate));

        if (signedInUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          console.log("refresh");
          return new fromAuthActions.AuthenticateSuccessAction({
            email: signedInUser.email,
            userId: signedInUser.id,
            token: signedInUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            // when auto login, for example, when login token is still valid and refresh the page,
            // set redirect to false
            redirect: false
          });
        }
        return new fromAuthActions.MissingUserDataAction();
      })
    );
  });

  readonly authLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.LOGOUT),
      tap(() => {

        console.log('start logout');

        sessionStorage.removeItem('userData');
        this.authService.clearLogoutTimer();
        this.router.navigate(['/auth']);
      })
    );
  }, { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly authService: AuthService) { }

  private handleAuthentication(responseData: AuthResponseData): fromAuthActions.AuthenticateSuccessAction {
    const expirationDuration = +responseData.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expirationDuration);

    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    sessionStorage.setItem('userData', JSON.stringify(user));

    return new fromAuthActions.AuthenticateSuccessAction({
      email: responseData.email,
      userId: responseData.localId,
      token: responseData.idToken,
      expirationDate,
      redirect: true
    });
  }

  private handleError(errorResponse: any): Observable<fromAuthActions.AuthenticateFailAction> {
    let errorMessage = 'Unable to process your request';
    if (errorResponse?.error?.error?.message) {
      switch (errorResponse?.error?.error?.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email is already taken';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Incorrect email and password';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Incorrect email and password';
          break;
      }
    }
    return of(new fromAuthActions.AuthenticateFailAction(errorMessage));
  }
}
