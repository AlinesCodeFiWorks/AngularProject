export interface Task {
  name: string;
  description: string;
  dueDate?: Date; //TODO fix date format to handle strings and date pipe instead
  completed: boolean;
  subtasks?: { subName: string; subCompleted: boolean }[];
}
