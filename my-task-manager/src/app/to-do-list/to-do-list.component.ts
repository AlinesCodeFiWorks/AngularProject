import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Task {
  name: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  subtasks?: Task[];
}
export interface subTask {
  subtasks?: { name: string; completed: boolean }[];
  //TODO: add subtasks to the task interface
}

@Component({
  selector: 'app-to-do-list',
  imports: [MatCheckboxModule, FormsModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  readonly task = signal<Task>({
    name: 'Parent task',
    description: 'Parent task description',
    dueDate: new Date(),
    completed: false,
    subtasks: [
      { name: 'Child task 1', completed: false },
      { name: 'Child task 2', completed: false },
      { name: 'Child task 3', completed: false },
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return (
      task.subtasks.some((t) => t.completed) &&
      !task.subtasks.every((t) => t.completed)
    );
  });

  update(completed: boolean, index?: number) {
    this.task.update((task) => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach((t) => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every((t) => t.completed) ?? true;
      }
      return { ...task };
    });
  }
  deleteTask(task: Task) {
    this.task.update((task) => {
      task.subtasks = task.subtasks?.filter((t) => t !== task);
      return { ...task };
    });
  }
  deleteSubtask(subtask: Task) {
    this.task.update((task) => {
      task.subtasks = task.subtasks?.filter((t) => t !== subtask);
      return { ...task };
    });
  }
}
