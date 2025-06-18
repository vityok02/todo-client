import { Task, CreateTask, UpdateTask } from './task.interfaces';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TaskMockService {
  mockTasks: Task[] = [
    { id: 1, title: 'Task 1', isCompleted: false },
    { id: 2, title: 'Task 2', isCompleted: true },
    { id: 3, title: 'Task 3', isCompleted: false },
  ];

  getAll(filter?: string): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      let tasks = [...this.mockTasks];

      if (filter) {
        tasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()));
      }

      observer.next(tasks);
      observer.complete();
    });
  }

  getById(id: number): Observable<Task> {
    return new Observable<Task>(observer => {
      const task = this.mockTasks.find(t => t.id === id);

      if (!task) {
        observer.error('Task not found');
        return;
      }

      observer.next(task!);
      observer.complete();
    });
  }

  create(task: CreateTask): Observable<Task> {
    return new Observable<Task>(observer => {
      const newTask: Task = {
        id: this.mockTasks.length + 1,
        title: task.title,
        isCompleted: false
      }

      this.mockTasks.push(newTask)

      observer.next(newTask);
      observer.complete();
    })
  }

  update(task: UpdateTask): Observable<Task> {
    return new Observable<Task>(observer => {
      const index = this.mockTasks.findIndex(t => t.id == task.id);
      const foundTask = this.mockTasks[index];

      if (!foundTask) {
        observer.error('Task not found');
        return;
      }

      foundTask.title = task.title;

      observer.next(foundTask);
      observer.complete();
    });
  }

  delete(id: number): Observable<void> {
    return new Observable<void>(observer => {
      const index = this.mockTasks.findIndex(t => t.id === id);
      const foundTask = this.mockTasks[index];

      if (!foundTask) {
        observer.error('Task not found');
        return;
      }

      this.mockTasks = this.mockTasks.filter(task => task.id !== foundTask.id);

      observer.next();
      observer.complete();
    });
  }

  complete(id: number): Observable<Task> {
    return new Observable<Task>(observer => {
      const index = this.mockTasks.findIndex(t => t.id === id);
      const foundTask = this.mockTasks[index];

      if (!foundTask) {
        observer.error('Task not found');
        return;
      }

      foundTask.isCompleted = true;

      observer.next(foundTask);
      observer.complete();
    });
  }
}
