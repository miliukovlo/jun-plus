export interface ITask {
  id: string;
  timeExcept: number;
  timeSpent: number;
  title: string;
  description: string;
}

export interface ITasksList {
  list: ITask[];
  activeTaskId: string | null;
  editTaskId: string | null;
}
