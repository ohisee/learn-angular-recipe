import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit, OnDestroy {
  /**
   * Use this subject to unsubscribe 
   */
  private readonly unsubscibeSubject$: Subject<void> = new ReplaySubject<void>();

  /**
   * not in use
   * @deprecated
   */
  selectedRecipe?: Recipe;

  constructor(private readonly recipeService: RecipeService) { }

  /**
   * recipe-item emits event when clicking on a recipe item
   * subscribe to this event here
   */
  public ngOnInit(): void {
    this.recipeService.recipeSelectedEventEmitter.pipe(
      takeUntil(this.unsubscibeSubject$)
    ).subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

  /**
   * 1. not in use after moving the event emitter into recipe service
   * 2. switch to use router link
   * @deprecated
   */
  public onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  public ngOnDestroy(): void {
    this.unsubscibeSubject$.next();
    this.unsubscibeSubject$.complete();
  }

}

