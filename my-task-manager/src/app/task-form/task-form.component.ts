import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  tasksService = inject(TasksService);
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
    this.newTask = {
      name: '',
      description: '',
      dueDate: new Date(),
      completed: false,
      subtasks: [],
      // TODO: not working lol
    };
  }
}
