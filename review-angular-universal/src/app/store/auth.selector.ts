import { createSelector } from "@ngrx/store";

import { AuthState } from "./auth.reducer";
import { RecipeAppState } from "./index";

const selectAuthUserState = (state: RecipeAppState) => state.userAuth;

export const selectAuthUser = createSelector(
  selectAuthUserState,
  (state: AuthState) => state.user
);

export const selectAuthError = createSelector(
  selectAuthUserState,
  (state: AuthState) => state.authError
);

export const selectAuthLoading = createSelector(
  selectAuthUserState,
  (state: AuthState) => state.loading
);
