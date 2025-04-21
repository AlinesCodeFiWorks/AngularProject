import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  tasksService = inject(TasksService);
  readonly toDoList = this.tasksService.getTasks();

  taskDetailsVisibility = new Map<string, boolean>();

  isTaskExpanded(task: Task): boolean {
    return this.taskDetailsVisibility.get(task.name) ?? false;
  }

  toggleTaskDetails(task: Task) {
    const current = this.taskDetailsVisibility.get(task.name) ?? false;
    this.taskDetailsVisibility.set(task.name, !current);
  }

  readonly partiallyComplete = computed(() => {
    const tasks = this.toDoList();
    return tasks.some(
      (task) =>
        task.subtasks?.some((t) => t.subCompleted) &&
        !task.subtasks?.every((t) => t.subCompleted)
    );
  });

  isPartiallyComplete(task: Task): boolean | undefined {
    return (
      task.subtasks?.some((s) => s.subCompleted) &&
      !task.subtasks?.every((s) => s.subCompleted)
    );
  }

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
  // More troubleshooting notes: tracking which task is currently getting a new subtask
  addingSubtaskTo = signal<string | null>(null);
  newSubtaskName = '';

  startAddingSubtask(task: Task) {
    this.addingSubtaskTo.set(task.name);
  }
  cancelSubtaskInput() {
    this.addingSubtaskTo.set(null);
    this.newSubtaskName = '';
  }

  submitSubtask(task: Task) {
    const name = this.newSubtaskName.trim();
    if (!name) return;

    this.tasksService.addSubtaskToTask(task.name, name);
    this.addingSubtaskTo.set(null);
    this.newSubtaskName = '';
  }

  // trackin which task is being edited
  editingTaskName = signal<string | null>(null);

  startEditingTask(task: Task) {
    this.editingTaskName.set(task.name);
  }

  stopEditingTask(task: Task, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === task.name) {
      this.editingTaskName.set(null);
      return;
    }

    this.tasksService.updateTaskName(task.name, trimmed);

    this.editingTaskName.set(null);
  }
}
