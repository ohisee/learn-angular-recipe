import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import { AuthService } from './shared/services/auth.service';
import { RecipeAppState } from "src/app/store";
import * as fromAuthActions from "src/app/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly loggingService: LoggingService,
    private readonly store: Store<RecipeAppState>) { }

  ngOnInit(): void {
    // this.authService.onSignInFetchUserData();
    this.store.dispatch(new fromAuthActions.AutoLoginAction());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }

  /**
   * use router to replace capturing event
   * @deprecated
   */
  // featureToShow: string = 'Recipe';

  /**
   * use router to replace capturing event
   * @deprecated
   */
  // public onNavigate(feature: string): void {
  //   this.featureToShow = feature;
  // }

}

