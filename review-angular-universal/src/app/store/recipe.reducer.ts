import { Action } from "@ngrx/store";

import { Recipe } from "src/app/components/recipes/recipe.model";
import * as fromRecipeActions from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[];
}

const recipes: Recipe[] = [
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
  //     new Ingredient("tomatoes", 2),
  //     new Ingredient("pickles", 20)
  //   ]
  // ),
];

const initialState: RecipeState = {
  recipes: []
};

export function recipeReducer(
  state: RecipeState = initialState, action: Action): RecipeState {
  switch (action.type) {
    case fromRecipeActions.SET_RECEIPES:
      return {
        ...state,
        recipes: [...(action as fromRecipeActions.RecipeActions).payload],
      };
    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (action as fromRecipeActions.AddRecipeAction).payload]
      };
    case fromRecipeActions.UPDATE_RECIPE:
      const { index, recipe } = (action as fromRecipeActions.UpdateRecipeAction).payload;
      if (index < 0 || index >= state.recipes.length) {
        return { ...state };
      }

      const updatedRecipe = {
        ...state.recipes[index],
        ...recipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case fromRecipeActions.DELETE_RECIPE:
      const idx = (action as fromRecipeActions.DeleteRecipeAction).payload;
      console.log(idx);
      return {
        ...state,
        recipes: state.recipes.filter((recipe, i) => i !== idx)
      };
    default:
      return state;
  }
}
