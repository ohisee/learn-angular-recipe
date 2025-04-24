import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

  // readonly places = signal<Place[] | undefined>(undefined);

  readonly isFetching = signal<boolean>(false);

  readonly encounterError = signal<string>('');

  // must add provideHttpClient in app.config.ts 
  private readonly httpClient = inject(HttpClient);

  private readonly placeService = inject(PlacesService);

  private destroyRef = inject(DestroyRef);

  readonly places = this.placeService.loadedUserPlaces;

  public ngOnInit(): void {
    this.isFetching.set(true);

    const subscription = this.placeService.loadUserPlaces()
      .subscribe({
        // next: (places) => {
        //   if (places) {
        //     this.places.set(places);
        //   }
        // }, moved to pipe(tap()) placeSerivce
        complete: () => {
          this.isFetching.set(false);
        },
        error: (err: Error) => {
          this.encounterError.set(err.message);
        }
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  public onRemovePlace(place: Place): void {
    const subscription = this.placeService.removeUserPlace(place).subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
