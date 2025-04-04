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
  subtasks?: { name: string; completed: boolean }[];
}

@Component({
  selector: 'app-to-do-list',
  imports: [MatCheckboxModule, FormsModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  readonly tasks = signal<Task[]>([
    {
      name: 'Parent task 1',
      description: 'Parent task 1 description',
      dueDate: new Date(),
      completed: false,
      subtasks: [
        { name: 'Child task 1.1', completed: false },
        { name: 'Child task 1.2', completed: false },
      ],
    },
  ]);

  readonly partiallyComplete = computed(() => {
    const task = this.tasks();
    if (!task.every((t) => t.subtasks)) {
      return false;
    }
    return task.some((t) => t.completed) && !task.every((t) => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.tasks.update((task) => {
      if (index === undefined) {
        task.forEach((t) => {
          t.completed = completed;
          t.subtasks?.forEach((subtask) => (subtask.completed = completed));
        });
      } else {
        task[index].subtasks![index].completed = completed;
        task[index].completed =
          task[index].subtasks?.every((t) => t.completed) ?? true;
      }
      return { ...task };
    });
  }
  deleteTask(taskToDelete: Task) {
    this.tasks.update((tasks) => {
      return tasks.filter((task) => task !== taskToDelete);
    });
  }
  deleteSubtask(subtask: Task) {
    this.tasks.update((tasks) => {
      tasks.forEach((task) => {
        task.subtasks = task.subtasks?.filter((t) => t !== subtask);
      });
      return tasks;
    });
  }
}
