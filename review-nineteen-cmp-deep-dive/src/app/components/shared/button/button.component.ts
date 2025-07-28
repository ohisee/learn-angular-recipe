import { Component } from '@angular/core';

// for extending built-in element, use attribute binding in selector 
@Component({
  selector: 'button[appButton], a[appButton]', // similiar to CSS selector, attribute binding 
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
