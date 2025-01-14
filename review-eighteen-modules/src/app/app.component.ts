import { Component } from '@angular/core';
import { DUMMY_USERS } from './users-data';

@Component({
  selector: 'app-root',
  standalone: false,
  // imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId: string = '';

  /**
   * Getter
   */
  public get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId);
  }

  /**
   * Select user handler
   */
  public onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
