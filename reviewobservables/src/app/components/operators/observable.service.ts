/**
 * @fileoverview observable service
 */
import { Injectable } from "@angular/core";
import { Observable, of, catchError } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ObservableService {

  /**
   * Some function for testing observable
   */
  public stringToNumber(message: string): Observable<number> {
    return this.getString(message).pipe(
      switchMap((msg: string) => {
        console.log(`switchMap parameter : ${msg}`);
        const result = this.toNumber(msg);
        return this.createNumber(result);
      }),
      tap((resultFromSwitchMap: number) => {
        console.log(`tap result from switchMap : ${resultFromSwitchMap}`);
        this.createString(`${resultFromSwitchMap}`);
      }),
      catchError((err: Error) => {
        console.log('caught error : ', err.message);
        throw new Error(err.message);
      })
    );
  }

  private createNumber(counter: number): Observable<number> {
    return of(counter);
  }

  private createString(str: string): Observable<string> {
    if (str === '0') {
      throw new Error(`get ${str}, try again`);
    }
    return of(str);
  }

  private getString(message: string): Observable<string> {
    return new Observable(subsriber => {
      if (message === 'error') { // or /^[\s]*error/i.test(message);
        subsriber.error(new Error('invalid input message'));
      } else {
        subsriber.next(message);
      }
    });
  }

  private toNumber(str: string): number {
    if (str) {
      return [...str].reduce((pre: number, cur: string) => {
        return pre + cur.charCodeAt(0)
      }, 0);
    }
    return 0;
  }

}
