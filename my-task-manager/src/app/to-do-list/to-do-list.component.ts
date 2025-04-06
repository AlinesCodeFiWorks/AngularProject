import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task, TasksService } from '../services/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-to-do-list',
  imports: [MatCheckboxModule, FormsModule /*TaskFormComponent*/], //TODO add this component once readyS
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  private tasksService = inject(TasksService);
  readonly toDoList = this.tasksService.getTasks();

  readonly partiallyComplete = computed(() => {
    const tasks = this.toDoList();
    return tasks.some(
      (task) =>
        task.subtasks?.some((t) => t.subCompleted) &&
        !task.subtasks?.every((t) => t.subCompleted)
    );
  });

  update(completed: boolean, index?: number) {
    this.toDoList.update((task) => {
      if (index === undefined) {
        task.forEach((t) => {
          t.completed = completed;
          t.subtasks?.forEach((subtask) => (subtask.subCompleted = completed));
        });
      } else {
        task.forEach((t) => {
          if (t.subtasks && index !== undefined) {
            t.subtasks[index].subCompleted = completed;
            t.completed = t.subtasks.every((subtask) => subtask.subCompleted);
          }
        });
      }
      return { ...task };
    });
  }
}
