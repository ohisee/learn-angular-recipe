import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlightHostListener]'
})
export class BetterHighlightHostListenerDirective implements OnInit {

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2) { }

  public ngOnInit(): void {
  }

  @HostListener('mouseenter') mouseover(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blueviolet');
  }

  @HostListener('mouseleave') mouseleave(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }

}
