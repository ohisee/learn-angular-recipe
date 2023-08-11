/**
 * @fileoverview routing module
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children:
  //     [
  //       { path: '', component: RecipeStartComponent },
  //       { path: 'new', component: RecipeEditComponent }, // must be before :id route to avoid parsing 'new' as id
  //       { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
  //       { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
  //     ]
  // },
  // { path: 'shopping-list', component: ShoppingListComponent },
  // { path: 'auth', component: AuthComponent }

  // lazy loading, must remove from importing RecipesModule in app module ts file 
  {
    path: 'recipes',
    loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule)
  },
  // lazy loading, must remove from importing ShoppingListModule in app module ts file 
  {
    path: 'shopping-list',
    loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
