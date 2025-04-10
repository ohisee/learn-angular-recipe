import { Component, inject } from '@angular/core';
import { AvailablePlacesComponent } from "./components/places/available-places/available-places.component";
import { UserPlacesComponent } from "./components/places/user-places/user-places.component";
import { ErrorService } from './components/shared/error.service';
import { ErrorModalComponent } from "./components/shared/modal/error-modal/error-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly errorService : ErrorService = inject(ErrorService);

  readonly error = this.errorService.error;
}
