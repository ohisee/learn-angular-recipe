/**
 * @fileoverview attribute selector component
 */
import { Component } from "@angular/core";

@Component({
  selector: "[app-attribute]",
  templateUrl: "./attribute-selector.component.html",
  styles: [
    `
      h3 {
        color: darkcyan;
      }
    `
  ]
})
export class AttributeSelectorComponent {}
