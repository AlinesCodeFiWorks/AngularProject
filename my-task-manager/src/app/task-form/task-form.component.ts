import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  newTask: Task = {
    name: '',
    description: '',
    dueDate: undefined,
    completed: false,
    subtasks: [{ name: '', completed: false }],
  };
  addTask(newTask: Task) {
    console.log('Task added:', newTask);
  }
}
