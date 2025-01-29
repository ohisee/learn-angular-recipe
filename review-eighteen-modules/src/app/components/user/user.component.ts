import { Component, computed, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
// import { CardComponent } from '../shared/card/card.component';
// import { DUMMY_USERS } from "../../users-data";

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

type User = { id: string, avatar: string, name: string };

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // readonly selectedUser = signal(DUMMY_USERS[randomIndex]);
  // readonly imagePath = computed(() => `users/${this.selectedUser().avatar}`);

  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) id!: string;

  @Input({ required: true }) user!: User;

  @Input({required: true}) selected: boolean = false;

  @Output() select = new EventEmitter<string>();

  selectOutput = output<string>();

  // read only
  // avatar = input.required<string>();
  // name = input.required<string>();
  // imagePath = computed(() => `users/${this.avatar()}`);

  /**
   * Getter
   */
  public get imagePath() {
    // return `users/${this.selectedUser.avatar}`;
    return `users/${this.user.avatar}`;
  }

  /**
   * click handler
   */
  public onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
    this.select.emit(this.user.id);
  }

  /**
   * Click handler using output method
   */
  public onSelectUserUsingOutupt() {
    this.selectOutput.emit(this.user.id);
  }
}
