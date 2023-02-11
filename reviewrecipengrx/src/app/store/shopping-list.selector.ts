import { createSelector } from "@ngrx/store";

import { RecipeAppState } from "./index";
import { ShoppingListState } from "./shopping-list.reducer"

const selectShoppingList = (state: RecipeAppState) => state.shoppingList;

export const selectIngredientList = createSelector(
  selectShoppingList,
  (state: ShoppingListState) => state.ingredients
);

