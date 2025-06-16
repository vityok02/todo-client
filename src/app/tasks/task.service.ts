import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTask, Task, UpdateTask } from './task.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseUrl = "https://localhost:5001/api/v1/tasks";

  constructor(private http: HttpClient) { }

  getAll(filter?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (filter) {
      params = params.set('title', filter);
    }

    return this.http.get<Task[]>(this.baseUrl, { params: params });
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseUrl + '/' + id);
  }

  create(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  update(task: UpdateTask): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/' + task.id, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }

  complete(id: number): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/' + id + '/complete', null);
  }
}
