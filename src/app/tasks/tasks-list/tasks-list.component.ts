import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { ITask } from '../ITask';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent {
  tasks: ITask[] = [];
  filter: string = '';;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAll().subscribe({
      next: data => {
        this.tasks = data;
      },
      error: error => {
        console.error('There was an error fetching the tasks!', error);
      }
    })
  }

  onTaskCreated(task: ITask) {
    this.tasks.push(task);
  }

  onTaskDeleted(taskId: number) {
    this.taskService.delete(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }
    })
  }
}
