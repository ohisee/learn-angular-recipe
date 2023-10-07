/**
 * @fileoverview recipe model
 */
import { Ingredient } from "src/app/shared/models/Ingredient.model";

export class Recipe {

  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]) {
  }
}

export type RecipeType = {
  name: string,
  description: string,
  imagePath: string,
  ingredients: Ingredient[],
};
