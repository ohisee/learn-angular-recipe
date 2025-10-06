import { inject, Injectable, signal } from "@angular/core";
import type { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../../logging.service";

// injectable decorator 
// @Injectable({
//   providedIn: 'root' // can be injected anywhere in this application, more optimized code bundle 
// })
export class TasksService {
  private tasks = signal<Task[]>([]);

  // inject other service in this TasksService 
  private loggingService: LoggingService = inject(LoggingService);

  readonly allTasks = this.tasks.asReadonly();

  public addTask(task: { title: string, description: string }): void {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN'
    };
    this.tasks.update((oldTasks) => {
      return [...oldTasks, newTask];
    });
    this.loggingService.log(task.title);
  }

  public updateTaskStatus(taskId: string, newStatus: TaskStatus): void {
    this.tasks.update((oldTasks) => {
      return oldTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus
          };
        }
        return task;
      })
    });
    this.loggingService.log(`${taskId} ${newStatus}`);
  }
}
