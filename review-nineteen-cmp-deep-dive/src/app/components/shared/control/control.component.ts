import {
  AfterContentInit,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // disable style encapsulation, set to global
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
  // add key and value pairs in host as properties to the host element 
  // for this component, the host element is <app-control />
})
export class ControlComponent implements AfterContentInit {

  // or use HostBinding to set properties in host element 
  // @HostBinding('class') className = 'control';

  // bind method to handle event on host element 
  // @HostListener('click') onClick() {
  //   console.log('clicked control element');
  // } 

  label = input.required<string>();

  // select element in the projected content ng-content 
  // template variable name is in the html template which is projected into this component 
  @ContentChild('inputTemplateVariable') private controlElement?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  // use contentChild function control signal
  private controlElementSignal = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputTemplateVariable');

  // inject element ref 
  private hostElement = inject(ElementRef);

  ngAfterContentInit(): void {
    console.log('After content init');
    console.log(this.controlElementSignal()?.nativeElement);
  }

  onClick() {
    console.log('clicked control element', this.hostElement);
    console.log(this.controlElement?.nativeElement);
    console.log(this.controlElementSignal()?.nativeElement);
  }
}
