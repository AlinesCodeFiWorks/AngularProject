import { Injectable, signal } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([
    {
      name: 'Eample task 1',
      description: 'Description 1',
      dueDate: new Date('2025-04-06'),
      completed: false,
      subtasks: [
        { subName: 'Example subtask 1', subCompleted: false },
        { subName: 'Example subtask 2', subCompleted: false },
      ],
    },
    {
      name: 'Example task 2',
      description: 'Description 2',
      dueDate: new Date('2025-04-06'),
      completed: false,
      subtasks: [
        { subName: 'Example subtask 1', subCompleted: false },
        { subName: 'Example subtask 2', subCompleted: false },
      ],
    },
  ]);

  getTasks() {
    return this.tasks;
  }
  addTask(newTask: Task) {
    this.tasks.update((tasks) => [...tasks, { ...newTask }]);
  }
  deleteTask(task: Task) {
    this.tasks.update((tasks) =>
      tasks.filter((currentTask) => currentTask !== task)
    );
  }

  addSubtaskToTask(taskName: string, subtaskName: string) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.name === taskName) {
          const updatedSubtasks = [
            ...(task.subtasks ?? []),
            { subName: subtaskName, subCompleted: false },
          ];
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      });
    });
  }

  deleteSubtask(taskName: string, subName: string) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.name === taskName) {
          task.subtasks = task.subtasks?.filter(
            (subtask) => subtask.subName !== subName
          );
        }
        return task;
      });
    });
  }

  isTaskOverdue(task: Task): boolean {
    if (!task.dueDate) return false;
    // troubleshooting note: zeroing time on both dates using the .setHours() built-in method to keep times from interfering on the comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    //and then here we check if the task is overdue without any time-of-day shenanigans!
    return dueDate < today && !task.completed;
  }

  updateTask(updatedTask: Task) {
    //TODO update task
  }
  shareToDoList() {
    // TODO develop this feature
    const tasksJson = JSON.stringify(this.tasks());
    const encodedTasks = encodeURIComponent(tasksJson);
    const shareLink = `${window.location.origin}/shared-tasks?data=${encodedTasks}`;
  }
}
