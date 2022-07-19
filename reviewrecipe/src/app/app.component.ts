import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly loggingService: LoggingService) { }

  ngOnInit(): void {
    this.authService.onSignInFetchUserData();
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

