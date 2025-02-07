import { Injectable } from "@angular/core";
import { type NewTaskData } from "./task.model";
import { type Task } from "./task/task.model";

@Injectable({ providedIn: "root" })
export class TasksService {

  private readonly tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2025-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary: 'Prepare and describe an issue template which will help with project management',
      dueDate: '2025-06-15',
    },
  ];


  constructor() {
    const tasksStr = localStorage.getItem('tasks');
    if (tasksStr) {
      const tasks: any[] = JSON.parse(tasksStr);
      this.tasks.splice(0, this.tasks.length);
      this.tasks.push(...tasks);
    }
  }


  public getUserTasks(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  public addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: `t${new Date().getTime()}`,
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
  }

  public removeTask(taskId: string) {
    // this.tasks.filter(task => task.id !== taskId);
    let result = this.tasks.findIndex(task => task.id === taskId);
    if (result > -1) {
      this.tasks.splice(result, 1);
    }
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
