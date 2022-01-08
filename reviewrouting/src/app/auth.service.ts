/**
 * @fileoverview authentication service
 */
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  private loggedIn: boolean = false;

  public isAuthenticated(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.loggedIn), 600);
    });
    return promise;
  }

  public login(): void {
    this.loggedIn = true;
  }

  public logout(): void {
    this.loggedIn = false;
  }
}
