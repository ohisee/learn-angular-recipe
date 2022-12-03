import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { RecipeAppState } from "src/app/store";
import * as fromAuthActions from "src/app/store/auth.actions";
import * as fromAuthSelectors from "src/app/store/auth.selector";
import { AuthResponseData } from './model/auth-response-data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignInMode = true;
  isLoading = false;
  errorMessage: string | null = null;

  @ViewChild(PlaceholderDirective, { static: true }) alertHost?: PlaceholderDirective;

  private subscription?: Subscription;

  private replaySubject: ReplaySubject<void> = new ReplaySubject();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store<RecipeAppState>) { }

  ngOnInit(): void {
    this.store.select(fromAuthSelectors.selectAuthLoading).pipe(
      takeUntil(this.replaySubject)
    ).subscribe(
      loading => {
        this.isLoading = loading;
      }
    );

    this.store.select(fromAuthSelectors.selectAuthError).pipe(
      takeUntil(this.replaySubject)
    ).subscribe(
      errMsg => {
        this.errorMessage = errMsg;
        if (this.errorMessage) {
          this.showErrorAlert(this.errorMessage);
        }
        this.isLoading = false;
      }
    );
  }

  onSwitchMode(): void {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    const observer: Observer<AuthResponseData> = {
      next: (responseData => {
        // console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }),
      error: (errorResponse => {
        console.log(errorResponse);
        this.errorMessage = errorResponse.message;
        this.isLoading = false;
        this.showErrorAlert(errorResponse.message);
      }),
      complete: (() => { }),
    };

    this.isLoading = true;
    if (this.isSignInMode) {
      // this.authService.signIn(email, password).subscribe(observer);
      this.store.dispatch(new fromAuthActions.LoginStartAction({ email, password }));
    } else {
      // this.authService.signUp(email, password).subscribe({
      //   next: (responseData => {
      //     console.log(responseData);
      //     this.isLoading = false;
      //   }),
      //   error: (errorResponse => {
      //     console.log(errorResponse);
      //     this.errorMessage = errorResponse.message;
      //     this.isLoading = false;
      //   })
      // });
      // this.authService.signUp(email, password).subscribe(observer);
      this.store.dispatch(new fromAuthActions.SignupStartAction({ email, password }));
    }

    console.log('sign in or up on submit');
    form.reset();
  }

  onHandleErrorMessage(): void {
    this.errorMessage = null;
    this.store.dispatch(new fromAuthActions.ClearErrorAction());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.replaySubject.next();
    this.replaySubject.complete();
  }

  // dynamically / programmatically create a component
  private showErrorAlert(errorMessage: string): void {
    // angular 13 and later does not component factory resolver anymore to 
    // dynamically / programmatically create a component 
    const alertComponentfactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    if (hostViewContainerRef) {
      // clear previously rendered component
      hostViewContainerRef.clear();

      const componentRef = hostViewContainerRef.createComponent(AlertComponent);
      componentRef.instance.message = errorMessage;
      this.subscription = componentRef.instance.close.subscribe(
        () => {
          this.subscription?.unsubscribe();
          hostViewContainerRef.clear();
        }
      );
    }
  }
}

