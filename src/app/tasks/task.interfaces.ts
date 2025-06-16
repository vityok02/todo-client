enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  status: TaskStatus;
}

export interface CreateTask {
  title: string;
}

export interface UpdateTask {
  id: number;
  title: string;
}
