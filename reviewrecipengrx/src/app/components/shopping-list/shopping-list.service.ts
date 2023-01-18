/**
 * @fileoverview shopping list service
 */
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/models/Ingredient.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {

  /**
   * use subject
   * @deprecated
   */
  readonly ingredientsChangedEventEmitter = new EventEmitter<Ingredient[]>();

  readonly ingredientsChangedSubject$ = new Subject<Ingredient[]>();

  readonly ingredientElementIndexStartedEditing$ = new Subject<number>();

  readonly ingredientDeletedFromShoppingList$ = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("apples", 12),
    new Ingredient("tomatoes", 12),
    new Ingredient("cabbage", 12),
    new Ingredient("onion", 12),
    new Ingredient("lettuces", 12),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    // this.ingredientsChangedEventEmitter.emit(this.ingredients.slice());
    this.ingredientsChangedSubject$.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    const ingredientsMap = this.ingredients.reduce(
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

    this.ingredients.push(...Object.values(ingredientsMap));
    // emit ingredients changed
    // this.ingredientsChangedEventEmitter.emit(this.ingredients.slice());

    this.ingredientsChangedSubject$.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient | undefined {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChangedSubject$.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    if (index >= 0 && index < this.ingredients.length) {
      this.ingredients.splice(index, 1);
      this.ingredientsChangedSubject$.next(this.ingredients.slice());
    }
  }
}
