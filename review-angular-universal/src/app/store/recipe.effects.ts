import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import { Recipe } from "src/app/components/recipes/recipe.model";
import { RecipeAppState } from ".";
import * as fromRecipeActions from "./recipe.actions";
import * as fromRecipeSelectors from "./recipe.selectors";

const RECIPE_URL = '/recipes.json';

@Injectable()
export class RecipeEffects {
  readonly fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.httpClient.get<Recipe[]>(RECIPE_URL);
      }),
      map(recipes => {
        return recipes.map(recipe => {
          // if ingredients is null, set ingredients to one empty array 
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      map(recipes => {
        return new fromRecipeActions.SetRecipesAction(recipes);
      })
    );
  });

  readonly storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select(fromRecipeSelectors.selectRecipes)),
      switchMap(([action, recipes]) => {
        return this.httpClient.put(RECIPE_URL, recipes);
      })
    );
  }, { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient,
    private readonly store: Store<RecipeAppState>) { }
}
