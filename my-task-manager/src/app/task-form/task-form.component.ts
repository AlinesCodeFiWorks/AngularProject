import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-task-form',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  tasksService = inject(TasksService);

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;

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
