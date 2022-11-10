import { Directive, ElementRef } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = '#5f5aee';
    this.elementRef.nativeElement.style.color = 'black';
    this.elementRef.nativeElement.style.padding = '0.5rem';
  }
}

