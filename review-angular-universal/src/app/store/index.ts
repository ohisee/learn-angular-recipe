import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingList from "src/app/store/shopping-list.reducer";
import * as fromAuth from "src/app/store/auth.reducer";
import * as fromRecipes from "src/app/store/recipe.reducer";

export interface RecipeAppState {
  shoppingList: fromShoppingList.ShoppingListState,
  userAuth: fromAuth.AuthState,
  recipes: fromRecipes.RecipeState,
}

export const recipeAppReducers: ActionReducerMap<RecipeAppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  userAuth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
}
