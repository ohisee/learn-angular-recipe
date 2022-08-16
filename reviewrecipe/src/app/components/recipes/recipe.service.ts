/**
 * @fileoverview recipe service
 */
import { EventEmitter, Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Ingredient } from "src/app/shared/models/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {

  /**
   * use subject in case there is a need to trigger an event
   * in addition, there is no need for this recipeSelected after changing to use router outlet
   * @deprecated
   */
  recipeSelectedEventEmitter = new EventEmitter<Recipe>();

  readonly recipeSelectedSubject$ = new Subject<Recipe>();

  readonly recipesChanged$ = new BehaviorSubject<Recipe[]>([]);

  private recipes: Recipe[] = [
    // new Recipe(
    //   "Tasty pizza",
    //   "a test description a test description ",
    //   "https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg",
    //   [
    //     new Ingredient("french fries", 10),
    //     new Ingredient("mushrooms", 7),
    //     new Ingredient("carrots", 12)
    //   ]
    // ),

    // new Recipe(
    //   "Tasty salad",
    //   "a test description a test description ",
    //   "https://cdn.pixabay.com/photo/2018/04/21/03/47/food-3337621_1280.jpg",
    //   [
    //     new Ingredient("buns", 2),
    //     new Ingredient("pickles", 20)
    //   ]
    // ),

    // new Recipe(
    //   "Tasty some flour",
    //   "a test description a test description ",
    //   "https://cdn.pixabay.com/photo/2017/05/07/22/38/breaking-2293848_1280.jpg",
    //   [
    //     new Ingredient("tomatos", 2),
    //     new Ingredient("pickles", 20)
    //   ]
    // ),
  ];

  constructor(private readonly shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // return a copy
  }

  getRecipe(id: number): Recipe {
    if (this.recipes[id]) {
      return this.recipes[id];
    }
    return this.recipes[0];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    if (index >= 0 && index < this.recipes.length) {
      this.recipes[index] = newRecipe;
    }
    this.recipesChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }
}

