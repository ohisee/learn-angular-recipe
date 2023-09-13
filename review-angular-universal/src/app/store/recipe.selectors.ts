import { createSelector } from "@ngrx/store";

import { RecipeAppState } from "./index";
import { RecipeState } from "./recipe.reducer";

const selectRecipesState = (state: RecipeAppState) => state.recipes;

export const selectRecipes = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.recipes,
);
