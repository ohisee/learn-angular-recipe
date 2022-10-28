import { NgModule } from '@angular/core';

// import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

/** This ng module file is not needed anymore after switching to standalong component. */
@NgModule({
  declarations: [
    // DashboardComponent
  ],
  imports: [DashboardRoutingModule]
})
export class DashboardModule {}

