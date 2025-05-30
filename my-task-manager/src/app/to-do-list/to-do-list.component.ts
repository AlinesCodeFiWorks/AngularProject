import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/task.model';
import { SharedModule } from '../shared/shared.module';
import { ShareToDoListComponent } from '../share-to-do-list/share-to-do-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do-list',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  constructor(private dialog: MatDialog) {}

  openShareDialog() {
    this.dialog.open(ShareToDoListComponent, {
      width: '400px',
      disableClose: false,
      autoFocus: true,
    });
  }

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
  editingSubtaskKey = signal<{ taskName: string; subName: string } | null>(
    null
  );

  startEditingSubtask(task: Task, subtask: { subName: string }) {
    this.editingSubtaskKey.set({
      taskName: task.name,
      subName: subtask.subName,
    });
  }

  stopEditingSubtask(task: Task, oldSubName: string, newSubName: string) {
    const trimmed = newSubName.trim();
    if (!trimmed || trimmed === oldSubName) {
      this.editingSubtaskKey.set(null);
      return;
    }

    this.tasksService.updateSubtaskName(task.name, oldSubName, trimmed);
    this.editingSubtaskKey.set(null);
  }

  isEditingSubtask(task: Task, subName: string) {
    const key = this.editingSubtaskKey();
    return key?.taskName === task.name && key?.subName === subName;
  }
}
