import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, ToDoListComponent } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, ToDoListComponent],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  addTask(task: Task) {
    console.log('Task added:', task);
  }
}
