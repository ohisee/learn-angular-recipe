import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    // component: AboutComponent,
    // lazy load standalong component 
    // only works for standalong component 
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent),
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./components/dashboard/dashboard-routing.module').then(
  //       (m) => m.DashboardRoutingModule
  //     ),
  // },

  // only needs routes definition, no need for wrapper router module, only works for standalong components 
  { 
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES 
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

