import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "src/app/components/auth/model/user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
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

const API_KEY = environment.apiKey;
const SIGNUP_API_URL = `https://${API_KEY}`;
const SIGNIN_API_URL = `https://${API_KEY}`;

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly user$ = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(SIGNUP_API_URL, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          responseData.expiresIn);
      }),
      catchError(errResponse => {
        // let errorMessage = 'Unable to sign up now';
        // if (errResponse?.error?.error?.message) {
        //   switch (errResponse?.error?.error?.message) {
        //     case 'EMAIL_EXISTS':
        //       errorMessage = 'Email is already taken';
        //       break;
        //     default:
        //       errorMessage = 'Unable to sign up now';
        //   }
        // }
        // return throwError(() => new Error(errorMessage));
        return this.handleError(errResponse);
      }),
    );
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(SIGNIN_API_URL, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          responseData.expiresIn);
      }),
      catchError(this.handleError));
  }

  onSignInFetchUserData(): void {
    const userDataStr = sessionStorage.getItem('userData');
    if (!userDataStr) {
      return;
    }
    const userData: UserData = JSON.parse(userDataStr);

    const signedInUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (signedInUser.token) {
      this.user$.next(signedInUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
    }
  }

  signOut(): void {
    this.user$.next(null);
    this.router.navigate(['/auth']);
    sessionStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
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
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresInSeconds: string) {
    // current date timestamp in milliseconds + expiresIn (in seconds) times 1000 to get millisecond
    const expirationDuration = +expiresInSeconds * 1000;
    const expirationDate = new Date(new Date().getTime() + expirationDuration);
    const user = new User(email, localId, idToken, expirationDate);
    this.user$.next(user);
    this.autoSignOut(expirationDuration)
    sessionStorage.setItem('userData', JSON.stringify(user));
  }
}

