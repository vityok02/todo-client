import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from './ITask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "https://localhost:5001/api/v1/tasks";

  constructor(private http: HttpClient) { }

  getAll(filter?: string): Observable<ITask[]> {
    let params = new HttpParams();

    if (filter) {
      params = params.set('title', filter);
    }

    return this.http.get<ITask[]>(this.baseUrl, { params: params });
  }

  getById(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.baseUrl + '/' + id);
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.baseUrl, task);
  }

  update(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.baseUrl + '/' + id, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }
}
