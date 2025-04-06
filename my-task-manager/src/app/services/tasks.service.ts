import { Injectable, signal } from '@angular/core';

export interface Task {
  name: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
  subtasks?: { subName: string; subCompleted: boolean }[];
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([
    {
      name: 'Eample task 1',
      description: 'Description 1',
      dueDate: new Date(4 / 6 / 2025),
      completed: false,
      subtasks: [{ subName: 'Example subtask 1', subCompleted: false }],
    },
    {
      name: 'Eample task 2',
      description: 'Description 2',
      dueDate: new Date(4 / 7 / 2025),
      completed: false,
      subtasks: [{ subName: 'Example subtask 2', subCompleted: false }],
    },
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
