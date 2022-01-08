import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './components/servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './components/servers/edit-server/edit-server.component';
import { ServerResolver } from './components/servers/server/server-resolver.service';
import { ServerComponent } from './components/servers/server/server.component';
import { ServersComponent } from './components/servers/servers.component';
import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers', component: ServersComponent,
    //  canActivate: [AuthGuardService], 
    canActivateChild: [AuthGuardService],
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent, pathMatch: 'full' },
  // pass static data through route
  { path: 'not-found', component: ErrorPageComponent, pathMatch: 'full' , data: {message: 'Page not found!'}},
  { path: '**', redirectTo: '/not-found' } // make this route is last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
