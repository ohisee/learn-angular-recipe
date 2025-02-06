import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksService } from './tasks.service';

interface Task {
  id: string,
  userId: string,
  title: string,
  summary: string,
  dueDate: string
}

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) name: string | undefined;
  // @Input() name?: string;
  @Input({ required: true }) userId!: string;

  isAddingTask: boolean = false;

  constructor(private readonly tasksService: TasksService) { }

  public get selectedUser(): Task[] {
    return this.tasksService.getUserTasks(this.userId);
  }

  public onStartAddTask() {
    this.isAddingTask = true;
  }

  public onCloseAddTasklHandler() {
    this.isAddingTask = false;
  }
}
