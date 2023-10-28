import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeAppState } from "src/app/store";
import * as fromRecipeSelectors from "src/app/store/recipe.selectors";
import * as fromRecipeActions from "src/app/store/recipe.actions";
import * as fromShoppingListActions from "src/app/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  showMenu: boolean = false;
  recipe?: Recipe;

  private id?: number;
  private subscription?: Subscription;

  /**
   * use router to get recipe data
   * reuse recipe as a variable for capturing recipe data
   * @deprecated
   */
  // @Input() recipe?: Recipe;

  constructor(
    private readonly recipeService: RecipeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<RecipeAppState>) { }

  public ngOnInit(): void {
    // this.subscription = this.activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     this.recipe = this.recipeService.getRecipe(this.id);
    //   }
    // );

    this.subscription = this.activatedRoute.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select(fromRecipeSelectors.selectRecipes).pipe(
          map(recipes => {
            return recipes.find((recipe, index) => {
              return index === id;
            });
          })
        );
      })
    ).subscribe(recipe => {
      if (recipe) {
        this.recipe = recipe;
      } else {
        console.log('recipe not found');
      }
    });
  }

  public onShowMenu(showMenu: boolean): void {
    this.showMenu = showMenu;
  }

  public onAddToShoppingList(): void {
    if (this.recipe) {
      // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      this.store.dispatch(
        new fromShoppingListActions.AddIngredientsAction(this.recipe.ingredients));
    }
    this.router.navigate(['shopping-list']);
  }

  public onClickToEditRecipe(): void {
    // relative route is /recipes/:id, just route edit
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    // or this way is to go up one level, then add id to route
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onClickToDeleteRecipe(): void {
    console.log('try to delete', this.id);
    if (this.id !== undefined && !isNaN(this.id)) {
      // this.recipeService.deleteRecipe(this.id);
      this.store.dispatch(new fromRecipeActions.DeleteRecipeAction(this.id));
    }
    this.router.navigate(['/recipes']);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
