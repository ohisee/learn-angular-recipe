import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import type { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  readonly userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);

  // give access to the content of template 
  private templateRef = inject(TemplateRef);

  // give access to DOM where this directive is being used 
  private viewContainer = inject(ViewContainerRef);

  constructor() {

    // run effect when a signal value changes
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // render the template's content where this directive is being used 
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // remove embedded view content 
        this.viewContainer.clear();
      }
    });
  }

}
