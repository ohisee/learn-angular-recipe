/**
 * @fileoverview directive
 */
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[basicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
