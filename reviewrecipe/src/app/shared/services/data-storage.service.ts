/**
 * @fileoverview data storage service
 */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../../components/recipes/recipe.model";
import { RecipeService } from "../../components/recipes/recipe.service";
import { AuthService } from "./auth.service";

const RECIPE_URL = './recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly recipeService: RecipeService,
    private readonly authService: AuthService) { }

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
        this.recipeService.setRecipes(recipes);
      })
    )

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

