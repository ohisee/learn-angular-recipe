import { Component } from '@angular/core';
import { SafeLinkeDirective } from '../../safe-link.directive';
import { LogDirective } from '../../log.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinkeDirective]
})
export class LearningResourcesComponent {

}
