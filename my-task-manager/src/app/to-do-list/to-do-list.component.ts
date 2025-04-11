import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';

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

  showTaskDetails = signal(false);
  //TODO find a wat to mode onToggleDetails() to tasks.service.js
  onToggleDetails() {
    this.showTaskDetails.set(!this.showTaskDetails());
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
    this.toDoList.update((tasks) => {
      return tasks.filter((task) => task !== taskToDelete);
    });
  }
  deleteSubtask(subName: string) {
    this.toDoList.update((tasks) => {
      tasks.forEach((task) => {
        task.subtasks = task.subtasks?.filter((t) => t.subName !== subName);
      });
      return tasks;
    });
  }
}
