/**
 * @fileoverview action identifiers
 */
import { Action, createAction, props } from "@ngrx/store";

import { Ingredient } from "src/app/shared/models/Ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const DELETE_INGREDIENT_WITHOUT_EDITING = '[Shopping List] Delete Ingredient Without Editing';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

const START_SHOPPING = "[Shopping List] START_SHOPPING";

export class AddIngredientAction implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) { }
}

export class AddIngredientsAction implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) { }
}

export class UpdateIngredientAction implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload: { ingredient: Ingredient }) { }
}

export class DeleteIngredientAction implements Action {
  readonly type: string = DELETE_INGREDIENT;
}

export class DeleteIngredientWithoutEditingAction implements Action {
  readonly type: string = DELETE_INGREDIENT_WITHOUT_EDITING;
  constructor(public payload: number) { }
}

export class StartEditAction implements Action {
  readonly type: string = START_EDIT;
  constructor(public payload: number) { }
}

export class StopEditAction implements Action {
  readonly type: string = STOP_EDIT;
}

const StartShoppingAction = createAction(START_SHOPPING, props<{ payload: boolean }>)

export type ShoppingActions = AddIngredientAction
  | AddIngredientsAction
  | UpdateIngredientAction
  | DeleteIngredientAction
  | StartEditAction
  | StopEditAction;
