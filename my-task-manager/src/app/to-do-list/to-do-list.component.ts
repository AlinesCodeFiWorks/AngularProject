import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-to-do-list',
  imports: [MatCheckboxModule, FormsModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  tasksService = inject(TasksService);
  readonly toDoList = this.tasksService.getTasks();

  showDetails = this.tasksService.showDetails;
  onToggleDetails() {
    this.tasksService.onToggleDetails();
  }

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
