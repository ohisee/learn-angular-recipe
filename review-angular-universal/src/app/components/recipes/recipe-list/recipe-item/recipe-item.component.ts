/**
 * @fileoverview recipe item component
 */
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() id?: number;
  @Input() recipe?: Recipe;

  constructor(private readonly recipeService: RecipeService) { }

  public ngOnInit(): void {
  }

  /**
   * use routing instead of emitting event
   * @deprecated
   */
  public onClick(): void {
    this.recipeService.recipeSelectedEventEmitter.emit(this.recipe);
  }

}
