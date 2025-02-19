import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<NewTaskData>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  private readonly tasksService = inject(TasksService);

  public onCancel() {
    this.close.emit();
  }

  public onSubmit() {
    // this.add.emit({
    //   title: this.enteredTitle(),
    //   summary: this.enteredSummary(),
    //   date: this.enteredDate(),
    // });
    this.tasksService.addTask({
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      date: this.enteredDate(),
    }, this.userId);
    this.close.emit();
  }
}
