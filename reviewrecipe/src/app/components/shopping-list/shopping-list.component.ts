import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from 'src/app/shared/models/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  private readonly replaySubject$ = new ReplaySubject<void>();
  private subscription?: Subscription;

  constructor(
    private readonly shopppingListService: ShoppingListService,
    private readonly loggingService: LoggingService) { }

  public ngOnInit(): void {
    this.ingredients = this.shopppingListService.getIngredients();
    this.shopppingListService.ingredientsChangedSubject$.pipe(
      takeUntil(this.replaySubject$)
    ).subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onClick(index: number): void {
    this.shopppingListService.ingredientElementIndexStartedEditing$.next(index);
  }

  onClickDelete(index: number): void {
    this.shopppingListService.deleteIngredient(index);
    this.shopppingListService.ingredientDeletedFromShoppingList$.next(index);
  }

  ngOnDestroy(): void {
    this.replaySubject$.next();
    this.replaySubject$.complete();
    // not needed anymore
    this.subscription?.unsubscribe();
    console.log("unsubscribe shopping list");
  }
}

