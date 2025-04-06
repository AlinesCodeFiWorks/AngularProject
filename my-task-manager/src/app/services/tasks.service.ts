import { Injectable, signal } from '@angular/core';

export interface Task {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([
    { name: 'Task 1', description: 'Description 1' },
    { name: 'Task 2', description: 'Description 2' },
  ]);

  getTasks() {
    return this.tasks;
  }
  addTasks(newTask: Task) {
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  deleteTask() {
    this.tasks.update((tasks) => tasks.slice());
  }
  updateTask(updatedTask: Task) {
    //TODO update task
  }
}
