import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Actions, ofType } from "@ngrx/effects";
import { switchMap, take } from "rxjs/operators";

import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { RecipeAppState } from "src/app/store";
import * as fromRecipeActions from "src/app/store/recipe.actions";
import * as fromRecipeSelectors from "src/app/store/recipe.selectors";

/**
 * RecipeResolverService is to get the recipe data through fetch recipe action.
 */
@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly recipeService: RecipeService,
    private readonly store: Store<RecipeAppState>,
    private readonly actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    return this.store.select(fromRecipeSelectors.selectRecipes).pipe(
      take(1),
      switchMap(recipes => {
        if (recipes.length > 0) {
          return of(recipes);
        } else {
          // empty recipes
          this.store.dispatch(new fromRecipeActions.FetchRecipesAction());
          return this.actions$.pipe(
            ofType(fromRecipeActions.SET_RECEIPES),
            take(1)
          );
        }
      })
    )
  }
}

