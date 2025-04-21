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
      name: 'Eample task 2',
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
