import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBetterHighlightHostBinding]'
})
export class BetterHighlightHostBindingDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlightHostBinding') highlightColor: string = 'blueviolet';

  // bind element's property
  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  constructor() { }

  public ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(event: Event) {
    // this.backgroundColor = 'blueviolet';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(event: Event) {
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
