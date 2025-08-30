import {
  afterNextRender,
  afterRender,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {

  // use ViewChild decorator to select element in the template of this component 
  // pass the name of template variable 
  // ElementRef is a wrapper, a generic type 
  @ViewChild('formTemplateVariable') private form?: ElementRef<HTMLFormElement>;

  // use ViewChild decorator to select multiple same type elements in the HTML template 
  @ViewChildren(ButtonComponent) buttons?: ElementRef<ButtonComponent>;

  // @Output() addTicket = new EventEmitter<{ title: string, text: string }>();

  addTicket = output<{ title: string, text: string }>();

  // can pass a component type or template name string 
  private formSignal = viewChild<ElementRef<HTMLFormElement>>('formTemplateVariable');

  // use required to tell there is always a form element 
  // private formSignal = viewChild.required<ElementRef<HTMLFormElement>>('formTemplateVariable');

  // public onSubmit(titleInputElement: HTMLInputElement): void {
  //   console.dir(titleInputElement);
  //   titleInputElement.value;
  // }

  // for two-way binding
  enteredTitle = '';
  enteredText = '';

  constructor() {
    // any changes happen anywhere in this web app 
    afterRender(() => {
      console.log('after render');
    });

    afterNextRender(() => {
      console.log('after next render');
    });
  }

  ngOnInit(): void {
    console.log('On init');
    // should be undefined in on init lifecycle hook 
    console.log(this.form?.nativeElement);
  }


  ngAfterViewInit(): void {
    console.log('After view init');
    console.log(this.formSignal()?.nativeElement);
  }

  /**
   * handle on submit of form 
   */
  public onSubmit(ticketTitle: string, ticketText: string): void {

    // this.addTicket.emit({ title: ticketTitle, text: ticketText });

    // use two-way binding 
    this.addTicket.emit({ title: this.enteredTitle, text: this.enteredText });
  
    // use two-way binding 
    this.enteredTitle = '';
    this.enteredText = '';

    // JavaScript optional chaining 
    this.form?.nativeElement.reset();

    this.formSignal()?.nativeElement.reset();
  }
}
