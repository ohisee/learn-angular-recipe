import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { type Task } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  // @Output() complete = new EventEmitter<string>();

  private readonly tasksService = inject(TasksService);

  public onCompleteTask() {
    // this.complete.emit(this.task.id);
    this.tasksService.removeTask(this.task.id);
  }
}
