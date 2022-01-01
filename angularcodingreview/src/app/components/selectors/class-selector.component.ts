/**
 * @fileoverview class selector component
 */
 import { Component } from "@angular/core";

 @Component({
   selector: ".app-class",
   templateUrl: "./class-selector.component.html",
   styles: [
     `
       h3 {
         color: darkgoldenrod;
       }
     `
   ]
 })
 export class ClassSelectorComponent {}
 