import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { RecipeAppState } from "src/app/store";
import * as fromAuthActions from "src/app/store/auth.actions";

/**
 * This service is replaced by ngrx effect. @see auth.effects.ts
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly store: Store<RecipeAppState>) { }

  setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new fromAuthActions.LogoutAction());
    }, expirationDuration);
  }

  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
