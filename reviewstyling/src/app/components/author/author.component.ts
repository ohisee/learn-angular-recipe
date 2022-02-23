import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [`
    h3 {
      margin: 0;
      font-size: 12px;
      /* color: #8c8c8c; */
    }
  `],
  // encapsulation: ViewEncapsulation.ShadowDom // using browser's native shadow dom instead of using angular's emulated shadow dow
  // encapsulation: ViewEncapsulation.None // turn off view encapsulation, all h3 will be applied 
  encapsulation: ViewEncapsulation.Emulated // angular's emulated shadow dow
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
