/**
 * @fileoverview dropdown directive
 */
import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @Output() showMenuClicked = new EventEmitter<boolean>();

  @HostBinding('class.show') showMenu: boolean = false;

  @HostListener('click') onClick(event: Event): void {
    this.showMenu = !this.showMenu;
    this.showMenuClicked.emit(this.showMenu);
  }

}
