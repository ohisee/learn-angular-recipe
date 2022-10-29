import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { TodayComponent } from "./today/today.component";

export const DASHBOARD_ROUTES : Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'today',
    component: TodayComponent,
  }
];

