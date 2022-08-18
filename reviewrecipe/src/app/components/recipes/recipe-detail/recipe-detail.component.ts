import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
    private readonly router: Router) { }

  public ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  public onShowMenu(showMenu: boolean): void {
    this.showMenu = showMenu;
  }

  public onAddToShoppingList(): void {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
    this.router.navigate(['shopping-list']);
  }

  public onClickToEditRecipe(): void {
    // relative route is /recipes/:id, just route edit
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // or this way is to go up one level, then add id to route
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onClickToDeleteRecipe(): void {
    if (this.id !== undefined && !isNaN(this.id)) {
      this.recipeService.deleteRecipe(this.id);
    }
    this.router.navigate(['/recipes']);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

