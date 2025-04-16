import {
  Component,
  ElementRef,
  inject,
  viewChild,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  tasksService = inject(TasksService);

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  showFormDetails = signal(false);
  //TODO find a wat to mode onToggleDetails() to tasks.service.js
  onToggleDetails() {
    this.showFormDetails.set(!this.showFormDetails());
  }

  newTask: Task = {
    name: '',
    description: '',
    dueDate: new Date(),
    completed: false,
    subtasks: [],
  };

  addTask() {
    console.log('Submitted task:', this.newTask);
    this.tasksService.addTask(this.newTask);
    this.resetForm();
  }
  resetForm() {
    this.form?.nativeElement.reset();

    this.newTask = {
      name: '',
      description: '',
      dueDate: new Date(),
      completed: false,
      subtasks: [],
    };
  }
}
