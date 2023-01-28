import { Action } from "@ngrx/store";
import { User } from "../components/auth/model/user.model";
import * as fromAuthActions from "./auth.actions";

export interface AuthState {
  user: User | undefined;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  authError: null,
  loading: false,
};

export function authReducer(
  state: AuthState = initialState, action: Action): AuthState {
  switch (action.type) {
    case fromAuthActions.AUTHENTICATE_SUCCESS:
      const { email, userId, token, expirationDate } = (action as fromAuthActions.AuthenticateSuccessAction).payload;
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: undefined,
        loading: false,
      }
    case fromAuthActions.LOGIN_START:
    case fromAuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case fromAuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: undefined,
        authError: (action as fromAuthActions.AuthenticateFailAction).payload,
        loading: false,
      };
    case fromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}

