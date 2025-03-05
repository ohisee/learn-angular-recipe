import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

// directive is just a component with no template 
@Directive({
  selector: 'a[appSafeLink]', // attribute selector, anchor tag 
  standalone: true,
  host: {
    '(click)': 'onConfirmedLeavePage($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkeDirective {

  // myapp is default input value, use same name as in 'selector' to allow appSafeLink="something"
  queryParam = input<string>('myapp', { alias: 'appSafeLink' });

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('safe link directive');
  }

  // or use host listener 
  // @HostListener()

  public onConfirmedLeavePage(event: MouseEvent): void {
    const okayToLeave = window.confirm('Do you want to leave the app?');

    if (okayToLeave) {
      // use Event tp get href 
      // typescript cast 
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();

      // use host element ref to get href 
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
