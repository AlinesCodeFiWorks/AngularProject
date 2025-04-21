export interface Task {
  name: string;
  description: string;
  dueDate?: string | Date;
  completed: boolean;
  subtasks?: { subName: string; subCompleted: boolean }[];
}
