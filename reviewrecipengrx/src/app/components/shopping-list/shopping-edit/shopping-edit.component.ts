/**
 * @fileoverview shopping edit component
 */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/models/Ingredient.model';
import { AddIngredientAction, DeleteIngredientAction, StopEditAction, UpdateIngredientAction } from "src/app/store/shopping-list.actions";
import * as fromRecipeApp from "src/app/store";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput', { static: true }) nameInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', { static: true }) amountInputRef?: ElementRef<HTMLInputElement>;

  @ViewChild('shoppingEditForm', { static: true }) shoppingEditForm?: NgForm;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  private readonly replaySubject$ = new ReplaySubject<void>();

  editMode = false;
  // private editedItemIndex = -1;
  private editedIngredient: Ingredient | undefined = undefined;

  constructor(private readonly store: Store<fromRecipeApp.RecipeAppState>) { }

  ngOnInit(): void {

    this.store.select('shoppingList').pipe(
      takeUntil(this.replaySubject$)
    ).subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          if (this.shoppingEditForm && this.editedIngredient) {
            this.shoppingEditForm.setValue({
              name: this.editedIngredient.name,
              amount: this.editedIngredient.amount,
            });
          }
        } else {
          this.editMode = false;
          this.shoppingEditForm?.reset();
        }
      }
    );
  }

  onAddItem(): void {
    if (this.nameInputRef && this.amountInputRef) {
      const name = this.nameInputRef.nativeElement.value;
      const amount = parseFloat(this.amountInputRef.nativeElement.value);
      const newIngredient = new Ingredient(name, amount);
      // this.shoppingListService.addIngredient(newIngredient);

      // this.ingredientAdded.emit(new Ingredient(
      //   this.nameInputRef.nativeElement.value,
      //   parseFloat(this.amountInputRef.nativeElement.value)));
    }
  }

  /**
   * Handle template driven form submit
   * @param form 
   */
  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(new AddIngredientAction(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClickClear(): void {
    this.editMode = false;
    this.shoppingEditForm?.reset();
    this.store.dispatch(new StopEditAction());
  }

  onClickDelete(): void {
    this.store.dispatch(new DeleteIngredientAction());
    this.editMode = false;
    this.shoppingEditForm?.reset();
  }

  ngOnDestroy(): void {
    this.replaySubject$.next();
    this.replaySubject$.complete();
    this.store.dispatch(new StopEditAction());
  }
}

