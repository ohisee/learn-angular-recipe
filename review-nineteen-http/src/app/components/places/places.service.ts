import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import type { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  private readonly httpClient: HttpClient = inject(HttpClient);

  private readonly errorService: ErrorService = inject(ErrorService);

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'backend error occurred fetching available places');
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'backend error occurred fetching our favorite places'
    ).pipe(
      tap({
        next: (userPlaces: Place[] | undefined) => {
          if (userPlaces) {
            this.userPlaces.set(userPlaces);
          }
        }
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {

    // read / get previous user selected places
    const prevPlaces: Place[] = this.userPlaces();

    // avoid adding same place again 
    if (!prevPlaces.some(pl => pl.id === place.id)) {
      // optimistic update 
      this.userPlaces.update(prevPlaces => [...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(
      catchError(error => {
        // need to roll back to previous places in case there is error
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store selected place');
        return throwError(() => new Error('Failed to store selected place'));
      })
    );
  }

  removeUserPlace(place: Place): Observable<any> {

    // read / get previous user selected places
    const prevPlaces: Place[] = this.userPlaces();

    if (prevPlaces.some(pl => pl.id === place.id)) {
      // optimistic update 
      this.userPlaces.update(prevPlaces => prevPlaces.filter(pl => pl.id !== place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError(error => {
          // need to roll back to previous places in case there is error
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to remove the selected place');
          return throwError(() => new Error('Failed to remove the selected place'));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string): Observable<Place[] | undefined> {
    const subscription = this.httpClient
      .get<{ places: Place[] }>(url, {
        observe: 'response' // http response object or 'events'
      })
      .pipe(
        map((response) => response.body?.places),
        catchError((error) => throwError(() => {
          console.log(error.message);
          return new Error(errorMessage);
        })) // generate a new observable 
      );
    return subscription;
  }
}
