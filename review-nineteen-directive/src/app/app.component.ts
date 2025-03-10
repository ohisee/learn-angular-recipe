import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LearningResourcesComponent } from './components/learning-resources/learning-resources.component';
import { AuthService } from './components/auth/auth.service';
import { AuthDirective } from './components/auth/auth.directive';
import { LogDirective } from './log.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthComponent, LearningResourcesComponent, NgIf, AuthDirective, LogDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService);

  // use computed function to check signal's value
  readonly isAdmin = computed(() => this.authService.activePermission() === 'admin');

}
