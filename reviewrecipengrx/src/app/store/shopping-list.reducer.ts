import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/Ingredient.model";
import * as fromShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | undefined;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient("apples", 12),
    new Ingredient("tomatoes", 12),
    new Ingredient("cabbage", 12),
    new Ingredient("onion", 12),
    new Ingredient("lettuces", 12),
  ],
  editedIngredient: undefined,
  editedIngredientIndex: -1,
};

export function shoppingListReducer
  (state: ShoppingListState = initialState, action: Action): ShoppingListState {
  switch (action.type) {
    case fromShoppingListActions.ADD_INGREDIENT:
      const ingredientToAdd = (action as fromShoppingListActions.AddIngredientAction).payload;
      const newIngredientList = [...state.ingredients];

      const foundAtIndex = newIngredientList.findIndex(ingredient => ingredient.name === ingredientToAdd.name);
      if (foundAtIndex === -1) {
        newIngredientList.push(ingredientToAdd);
      } else {
        const ingredient = newIngredientList[foundAtIndex];
        newIngredientList[foundAtIndex] =
          new Ingredient(ingredient.name, ingredient.amount + ingredientToAdd.amount)
      }

      return {
        ...state,
        ingredients: newIngredientList,
      };
    case fromShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...combineIngredients(
            state.ingredients,
            (action as fromShoppingListActions.AddIngredientsAction).payload)
        ]
      };
    case fromShoppingListActions.UPDATE_INGREDIENT:
      const { ingredient: newIngredient } =
        (action as fromShoppingListActions.UpdateIngredientAction).payload;
      const existingIngredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredients = [...state.ingredients];

      if (existingIngredient) {
        const updatedIngredient = {
          ...existingIngredient,
          ...newIngredient,
        };
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      }

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: undefined,
        editedIngredientIndex: -1
      };
    case fromShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredient: undefined,
        editedIngredientIndex: -1
      };
    case fromShoppingListActions.DELETE_INGREDIENT_WITHOUT_EDITING:
      const atIndex = (action as fromShoppingListActions.DeleteIngredientWithoutEditingAction).payload;
      return {
        ...state,
        ingredients: state.ingredients.filter((_, igIndex) => {
          return igIndex !== atIndex;
        }),
        editedIngredient: undefined,
        editedIngredientIndex: -1
      };
    case fromShoppingListActions.START_EDIT:
      const editedIndex = (action as fromShoppingListActions.StartEditAction).payload;
      return {
        ...state,
        editedIngredientIndex: editedIndex,
        editedIngredient: { ...state.ingredients[editedIndex] },
      };
    case fromShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: undefined,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}

function combineIngredients(existingIngredients: Ingredient[], ingredients: Ingredient[]): Ingredient[] {
  const ingredientsMap = existingIngredients.reduce(
    (lookupMap: { [key: string]: Ingredient }, ingredient: Ingredient) => {
      lookupMap[ingredient.name] = ingredient;
      return lookupMap;
    }, {});

  for (const ingredient of ingredients) {
    const foundIngredient = ingredientsMap[ingredient.name];
    if (foundIngredient) {
      ingredientsMap[ingredient.name] = {
        ...foundIngredient,
        amount: foundIngredient.amount + ingredient.amount
      };
    } else {
      ingredientsMap[ingredient.name] = ingredient;
    }
  }

  return Object.values(ingredientsMap);
}

