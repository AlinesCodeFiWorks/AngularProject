import { Injectable, signal } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([
    {
      name: 'Sample task',
      description: 'SAmple description',
      dueDate: new Date('2025-04-06'),
      completed: false,
      subtasks: [
        { subName: 'Sample subtask 1', subCompleted: false },
        { subName: 'Sample subtask 2', subCompleted: false },
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
  showFormDetails = signal(false);
  onToggleDetails() {
    this.showFormDetails.set(!this.showFormDetails());
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
    //inline editing: *should* work for name, description, due date, and subtasks!
    this.tasks.update((tasks) => {
      return tasks.map((task) =>
        task.name === updatedTask.name ? { ...updatedTask } : task
      );
    });
  }

  updateTaskName(originalName: string, newName: string) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.name === originalName ? { ...task, name: newName } : task
      )
    );
  }

  updateSubtaskName(taskName: string, oldSubName: string, newSubName: string) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.name !== taskName) return task;

        const updatedSubtasks = task.subtasks?.map((sub) =>
          sub.subName === oldSubName ? { ...sub, subName: newSubName } : sub
        );

        return { ...task, subtasks: updatedSubtasks };
      });
    });
  }
}
