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
  //TODO find a way to move onToggleDetails() to tasks.service.js
  onToggleDetails(task: Task) {
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

  markTaskComplete(taskIndex: number, completed: boolean) {
    this.toDoList.update((tasks) => {
      const task = tasks[taskIndex];
      task.completed = completed;
      task.subtasks?.forEach((sub) => (sub.subCompleted = completed));
      return [...tasks];
    });
  }

  markSubtaskComplete(
    taskIndex: number,
    subtaskIndex: number,
    completed: boolean
  ) {
    this.toDoList.update((tasks) => {
      const task = tasks[taskIndex];
      if (!task.subtasks) return tasks;

      task.subtasks[subtaskIndex].subCompleted = completed;
      task.completed = task.subtasks.every((sub) => sub.subCompleted);
      return [...tasks];
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
