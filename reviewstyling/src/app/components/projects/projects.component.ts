import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AnimationEvent } from "@angular/animations";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { itemStateTrigger, listStateTrigger, markedTrigger, slideStateTrigger } from "./animations";
import { routeFadeStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    markedTrigger, 
    itemStateTrigger, 
    slideStateTrigger, 
    routeFadeStateTrigger({ startOpacity: 0, duration: '200ms' }),
    listStateTrigger,
  ],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // use host binding to bind animation trigger
  @HostBinding('@routeFadeState') routerAnimation = true;
  projects: Project[] = [];
  displayedProjects: Project[] = [];
  markedPrjIndex = 0;
  progress: string = 'progressing';
  createNew = false;
  private readonly subject$ = new ReplaySubject<void>();

  constructor(private readonly prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects()
      .pipe(takeUntil(this.subject$))
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
          if (this.projects.length >= 1) {
            this.displayedProjects.push(this.projects[0]);
          }
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    // this.projects.push(project);
    // change to add at top 
    setTimeout(() => {
      this.projects.unshift(project);
    }, 300);
  }

  onItemAnimationDone(animationEvent: AnimationEvent, lastProjIndex: number): void {
    if (animationEvent.fromState !== 'void') {
      return;
    }
    if (this.projects.length > (lastProjIndex + 1)) {
      this.displayedProjects.push(this.projects[lastProjIndex + 1]);
    } else {
      this.projects = this.displayedProjects;
    }
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
