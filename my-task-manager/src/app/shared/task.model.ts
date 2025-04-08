export interface Task {
  name: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
  subtasks?: { subName: string; subCompleted: boolean }[];
}
