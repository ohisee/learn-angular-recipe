import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators'

/** Custom async validator, must pass this validator like emailAsyncCheck() in FormControl */
export function emailAsyncCheck(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return of(control.value === 'test@test.com').pipe(
      delay(1500),
      map((isSame: boolean) => {
        if (isSame) {
          return { 'emailIsForbidden': true };
        } else {
          return null;
        }
      }));
  }
}

/** Email validator, , must pass this validator like EmailValidator.emailCheckValidator() in FormControl */
export class EmailValidator {
  static emailCheckAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({ 'emailIsForbidden': true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
      return promise;
    }
  }
}
