import {
  Component,
  ElementRef,
  inject,
  viewChild,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  tasksService = inject(TasksService);

  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  showDetails = this.tasksService.showDetails;
  onToggleDetails() {
    this.tasksService.onToggleDetails();
  }

  newTask: Task = {
    name: '',
    description: '',
    dueDate: new Date(),
    completed: false,
    subtasks: [],
  };

  addTask() {
    this.tasksService.addTask(this.newTask);
    this.resetForm();
  }
  resetForm() {
    this.form().nativeElement.reset();
  }
}
