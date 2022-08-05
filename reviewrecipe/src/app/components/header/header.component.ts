/**
 * @fileoverview header component
 */
import { Component, EventEmitter, OnInit, Output, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/shared/services/auth.service";
import { DataStorageService } from "../../shared/services/data-storage.service";

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
    private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(
      user => {
        // this.isAuthenticated = (user) ? true : false;
        this.isAuthenticated = !!user;
      }
    );
  }

  /**
   * use router link instead of on click event
   * @deprecated
   */
  onClick(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onClickToSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onClickToFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onClickToSignOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

