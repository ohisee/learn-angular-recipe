import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
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
    private readonly store: Store<RecipeAppState>,
    @Inject(PLATFORM_ID) private platformId : Object ) { }

  ngOnInit(): void {
    // this.authService.onSignInFetchUserData();
    const isBrowser = isPlatformBrowser(this.platformId);
    const isServer = isPlatformServer(this.platformId);
    console.log('isPlatformBrowser', isBrowser);
    console.log('isPlatformServer', isServer);
    
    if (isBrowser) {
      this.store.dispatch(new fromAuthActions.AutoLoginAction());
    }
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
