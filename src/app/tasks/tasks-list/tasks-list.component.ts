import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { Task } from '../task.interfaces';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})

export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = '';

  constructor(private taskService: TaskService) { }

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

  onTaskCreated(task: Task) {
    this.tasks.push(task);
  }

  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  onTaskCompleted(taskId: number) {
    const index = this.tasks.findIndex(t => t.id === taskId);
    this.tasks[index].isCompleted = true;
  }
}
