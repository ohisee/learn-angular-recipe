/**
 * @fileoverview shopping edit component
 */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/models/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
  private editedItemIndex = -1;
  private editedIngredient: Ingredient | undefined = undefined;

  constructor(private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.shoppingListService.ingredientElementIndexStartedEditing$.pipe(
      takeUntil(this.replaySubject$)
    ).subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        if (this.shoppingEditForm && this.editedIngredient) {
          this.shoppingEditForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          });
        }
      }
    );

    this.shoppingListService.ingredientDeletedFromShoppingList$.pipe(
      takeUntil(this.replaySubject$)
    ).subscribe(() => {
      this.editMode = false;
      this.shoppingEditForm?.reset();
    });
  }

  public onAddItem(): void {
    if (this.nameInputRef && this.amountInputRef) {
      const name = this.nameInputRef.nativeElement.value;
      const amount = parseFloat(this.amountInputRef.nativeElement.value);
      const newIngredient = new Ingredient(name, amount);
      this.shoppingListService.addIngredient(newIngredient);

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
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  public onClickClear(): void {
    this.editMode = false;
    this.shoppingEditForm?.reset();
  }

  onClickDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.shoppingEditForm?.reset();
  }

  ngOnDestroy(): void {
    this.replaySubject$.next();
    this.replaySubject$.complete();
  }
}

