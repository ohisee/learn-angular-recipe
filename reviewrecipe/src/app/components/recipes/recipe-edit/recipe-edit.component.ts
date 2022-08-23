import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: number;
  editMode: boolean = false;
  recipeForm?: FormGroup;

  /**
   * Use this subject to unsubscribe 
   */
  private readonly unsubscibeSubject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeService: RecipeService,
    private readonly router: Router) { }

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscibeSubject$)
    ).subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== null && params['id'] !== NaN;
        this.initializeForm();
      }
    );
  }

  onSubmit(): void {
    const recipeName = this.recipeForm?.value['name'];
    const recipeImagePath = this.recipeForm?.value['imagePath'];;
    const recipeDescription = this.recipeForm?.value['description'];
    const recipeIngredients = this.recipeForm?.value['ingredients'];

    const recipe = new Recipe(
      recipeName, recipeDescription, recipeImagePath, recipeIngredients);
    if (this.editMode && this.id !== undefined && !isNaN(this.id)) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    // navigate away after save 
    this.onClickToCancel();
  }

  onClickToAddIngredient(): void {
    const ingredientsFormArray = (this.recipeForm?.get('ingredients') as FormArray);
    ingredientsFormArray.push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onClickToCancel(): void {
    // navigate away to recipe detail component 
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onClickToDeleteIngredient(index: number): void {
    const ingredientsFormArray = (this.recipeForm?.get('ingredients') as FormArray);
    ingredientsFormArray.removeAt(index);
  }

  private initializeForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode && this.id !== undefined && !isNaN(this.id)) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, [Validators.required]),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients,
    });
  }

  get controls() {
    return (this.recipeForm?.get('ingredients') as FormArray).controls
  }

  ngOnDestroy(): void {
    this.unsubscibeSubject$.next(true);
    this.unsubscibeSubject$.complete();
  }
}

