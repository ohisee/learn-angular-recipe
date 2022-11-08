import { Component } from '@angular/core';

import { AnalyticsService } from 'src/app/components/shared/analytics.service';
import { HighlightDirective } from 'src/app/components/shared/highlight.directive';

@Component({
  standalone: true,
  // imports: [SharedModule], // import shared module to use highlight directive if highlight directive is not standalong
  imports: [HighlightDirective], // HighlightDirective is standalong directive 
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) { }

  onClick(): void {
    this.analyticsService.registerClick();
  }
}

