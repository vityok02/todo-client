export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface CreateTask {
  title: string;
}

export interface UpdateTask {
  id: number;
  title: string;
}
