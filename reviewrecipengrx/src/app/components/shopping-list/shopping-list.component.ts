import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { takeUntil } from "rxjs/operators";

import { Ingredient } from 'src/app/shared/models/Ingredient.model';
import { LoggingService } from 'src/app/logging.service';
import { DeleteIngredientWithoutEditingAction } from 'src/app/store/shopping-list.actions';
import * as fromRecipeApp from "src/app/store";
import * as fromShoppingListSelector from "src/app/store/shopping-list.selector";
import { StartEditAction } from "src/app/store/shopping-list.actions";
import { ShoppingListState } from 'src/app/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients?: Observable<{ingredients: Ingredient[]}>;
  // ingredients?: Observable<ShoppingListState>;
  ingredients?: Observable<Ingredient[]>;

  private readonly replaySubject$ = new ReplaySubject<void>();
  private subscription?: Subscription;

  constructor(
    private readonly loggingService: LoggingService,
    private readonly store: Store<fromRecipeApp.RecipeAppState>) { }

  ngOnInit(): void {

    // this.ingredients = this.store.select('shoppingList');

    this.ingredients = this.store.select(fromShoppingListSelector.selectIngredientList);

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onClickToEdit(index: number): void {
    this.store.dispatch(new StartEditAction(index));
  }

  onClickToDelete(index: number): void {
    this.store.dispatch(new DeleteIngredientWithoutEditingAction(index));
  }

  ngOnDestroy(): void {
    this.replaySubject$.next();
    this.replaySubject$.complete();
    // not needed anymore
    this.subscription?.unsubscribe();
    console.log("unsubscribe shopping list");
  }
}

