import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import type { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  readonly places = signal<Place[] | undefined>(undefined);

  readonly isFetching = signal<boolean>(false);

  readonly encounterError = signal<string>('');

  // must add provideHttpClient in app.config.ts 
  private readonly httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);

  private placeService = inject(PlacesService);

  public ngOnInit(): void {
    this.isFetching.set(true);

    /*const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        observe: 'response' // http response object or 'events'
      })
      .pipe(
        map((response) => response.body?.places),
        catchError((error) => throwError(() => {
          console.log(error.message);
          return new Error('backend error occurred');
        })) // generate a new observable 
      )
      .subscribe({
        next: (places) => {
          if (places) {
            this.places.set(places);
          }
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (err: Error) => {
          this.encounterError.set(err.message);
        }
      });*/

    const subscription = this.placeService.loadAvailablePlaces().subscribe({
      next: (places) => {
        if (places) {
          this.places.set(places);
        }
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (err: Error) => {
        this.encounterError.set(err.message);
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  public onSelectPlace(selectedPace: Place): void {
    const subscription = this.placeService.addPlaceToUserPlaces(selectedPace).subscribe({
      next: (response) => {
        console.log(response);
      }
    }); // must subscribe to trigger http put request

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
