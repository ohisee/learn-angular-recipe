import { Action } from "@ngrx/store";

import { Recipe } from "src/app/components/recipes/recipe.model";

export const SET_RECEIPES = "[Recipes] Set Recipes";
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";
export const ADD_RECIPE = "[Recipes] Add Recipe";
export const UPDATE_RECIPE = "[Recipes] Update Recipe";
export const DELETE_RECIPE = "[Recipes] Delete Recipe";
export const STORE_RECIPES = "[Recipes] Store Recipes";

export class SetRecipesAction implements Action {
  readonly type: string = SET_RECEIPES;

  constructor(public payload: Recipe[]) { }
}

export class FetchRecipesAction implements Action {
  readonly type: string = FETCH_RECIPES;
}

export class AddRecipeAction implements Action {
  readonly type: string = ADD_RECIPE;

  constructor(public payload: Recipe) { }
}

export class UpdateRecipeAction implements Action {
  readonly type: string = UPDATE_RECIPE;

  constructor(public payload: { index: number, recipe: Recipe }) { }
}

export class DeleteRecipeAction implements Action {
  readonly type: string = DELETE_RECIPE;

  constructor(public payload: number) { }
}

export class StoreRecipesAction implements Action {
  readonly type: string = STORE_RECIPES;
}

export type RecipeActions = SetRecipesAction;

