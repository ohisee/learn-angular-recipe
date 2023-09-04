import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const MISSING_USER_DATA = '[Auth] Missing User Data';

interface UserPayload {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
  redirect: boolean;
}

export class AuthenticateSuccessAction implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;
  constructor(public payload: UserPayload) { }
}

export class LogoutAction implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStartAction implements Action {
  readonly type: string = LOGIN_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class AuthenticateFailAction implements Action {
  readonly type: string = AUTHENTICATE_FAIL;

  constructor(public payload: string) { }
}

export class SignupStartAction implements Action {
  readonly type: string = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class ClearErrorAction implements Action {
  readonly type: string = CLEAR_ERROR;
}

export class AutoLoginAction implements Action {
  readonly type: string = AUTO_LOGIN;
}

export class MissingUserDataAction implements Action {
  readonly type: string = MISSING_USER_DATA;
}

export type AuthActions = AuthenticateSuccessAction | LogoutAction;
