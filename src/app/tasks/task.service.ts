import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTask, Task, UpdateTask } from './task.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private url = `${environment.apiUrl}/v1/tasks`;

  constructor(private http: HttpClient) { }

  getAll(filter?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (filter) {
      params = params.set('title', filter);
    }

    return this.http.get<Task[]>(this.url, { params: params });
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(this.url + '/' + id);
  }

  create(task: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  update(task: UpdateTask): Observable<Task> {
    return this.http.put<Task>(this.url + '/' + task.id, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  complete(id: number): Observable<Task> {
    return this.http.post<Task>(this.url + '/' + id + '/complete', null);
  }
}
