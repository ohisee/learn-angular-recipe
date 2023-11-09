/**
 * @fileoverview recipe list component
 */
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeAppState } from "src/app/store";
import * as fromRecipeSelectors from "src/app/store/recipe.selectors";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  private replaySubject$ = new ReplaySubject<void>();

  /**
   * use router outlet instead of emitting event
   * @deprecated
   */
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<RecipeAppState>) {}

  /**
   * use router outlet instead of emitting event 
   * @deprecated
   */
  public onSelect(recipe: Recipe): void {
    this.selectedRecipe.emit(recipe);
  }

  public ngOnInit(): void {
    // this.recipeService.recipesChanged$.pipe(
    //   takeUntil(this.replaySubject$)
    // ).subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();

    this.store.select(fromRecipeSelectors.selectRecipes).pipe(
      takeUntil(this.replaySubject$)
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log("from recipe list", this.recipes);
      }
    );
  }

  public onClickToNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.replaySubject$.next();
    this.replaySubject$.complete();
  }
}
