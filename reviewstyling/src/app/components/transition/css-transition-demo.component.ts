import { Component } from "@angular/core";

@Component({
  selector: 'app-css-transition-demo',
  templateUrl: './css-transition-demo.component.html',
  styleUrls: ['./css-transition-demo.component.css']
})
export class CssTransitionDemoComponent {
  divClicked: boolean = false;
  startAnimate: boolean = false;
}
