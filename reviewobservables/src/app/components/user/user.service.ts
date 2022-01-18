/**
 * @fileoverview user service
 */
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly activatedEmitter = new EventEmitter<boolean>();

  readonly subject$: Subject<boolean> = new Subject<boolean>();
}
