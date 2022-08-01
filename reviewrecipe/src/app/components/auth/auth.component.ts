import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from 'src/app/shared/services/auth.service';
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void { }

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
      this.authService.signIn(email, password).subscribe(observer);
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
      this.authService.signUp(email, password).subscribe(observer);
    }

    form.reset();
  }

  onHandleErrorMessage(): void {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

