/**
 * @fileoverview data storage service
 */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "src/app/components/recipes/recipe.model";
import { RecipeService } from "src/app/components/recipes/recipe.service";
import { AuthService } from "./auth.service";
import { RecipeAppState } from "src/app/store";
import * as fromRecipeActions from "src/app/store/recipe.actions";

const RECIPE_URL = 'https://http-ng-project-5fd9f-default-rtdb.firebaseio.com/recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly recipeService: RecipeService,
    private readonly authService: AuthService,
    private readonly store: Store<RecipeAppState>) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(RECIPE_URL, recipes).subscribe(res => {
      console.log(res);
    });
  }

  fetchRecipes(): Observable<any> {
    // with user auth token using http interceptor 
    return this.httpClient.get<Recipe[]>(RECIPE_URL).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          // if ingredients is null, set ingredients to one empty array 
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      tap(recipes => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new fromRecipeActions.SetRecipesAction(recipes));
      })
    );

    // with user auth token using auth service
    // return this.authService.user$.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.httpClient.get<Recipe[]>(RECIPE_URL,
    //       {
    //         params: new HttpParams().set('auth', user?.token || ''),
    //       });
    //   }),
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       // if ingredients is null, set ingredients to one empty array 
    //       return { ...recipe, ingredients: recipe.ingredients || [] };
    //     });
    //   }),
    //   tap(recipes => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );

    // without user auth token 
    // return this.httpClient.get<Recipe[]>(RECIPE_URL)
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         // if ingredients is null, set ingredients to one empty array 
    //         return { ...recipe, ingredients: recipe.ingredients || [] };
    //       });
    //     }),
    //     tap(recipes => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   );
    // .subscribe(recipes => {
    //   this.recipeService.setRecipes(recipes);
    // });
  }
}
