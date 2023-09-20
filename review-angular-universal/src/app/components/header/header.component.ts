/**
 * @fileoverview header component
 */
import { Component, EventEmitter, OnInit, Output, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/shared/services/auth.service";
import { DataStorageService } from "../../shared/services/data-storage.service";
import { RecipeAppState } from "src/app/store";
import * as fromAuthActions from "src/app/store/auth.actions";
import * as fromAuthUserSelector from "src/app/store/auth.selector";
import * as fromRecipeActions from "src/app/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  showMenu: boolean = false;
  isAuthenticated = false;

  private subscription?: Subscription;

  /**
   * use router link instead of on click event
   * @deprecated
   */
  @Output() featureSelected = new EventEmitter<string>();

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly authService: AuthService,
    private readonly store: Store<RecipeAppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select(fromAuthUserSelector.selectAuthUser).subscribe(
      user => {
        // this.isAuthenticated = (user) ? true : false;
        this.isAuthenticated = !!user;
      }
    );
    // this.subscription = this.authService.user$.subscribe(
    //   user => {
    //     // this.isAuthenticated = (user) ? true : false;
    //     this.isAuthenticated = !!user;
    //   }
    // );
  }

  /**
   * use router link instead of on click event
   * @deprecated
   */
  public onClick(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onClickToSaveData(): void {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new fromRecipeActions.StoreRecipesAction());
  }

  onClickToFetchData(): void {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new fromRecipeActions.FetchRecipesAction());
  }

  onClickToSignOut(): void {
    // this.authService.signOut();
    this.store.dispatch(new fromAuthActions.LogoutAction());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
