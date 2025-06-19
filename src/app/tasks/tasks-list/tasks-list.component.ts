import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

import { TaskService } from '../task.service';
import { Task } from '../task.interfaces';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})

export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAll().subscribe({
      next: data => {
        this.filteredTasks = data;
        this.tasks = data;
      },
      error: error => {
        console.error('There was an error fetching the tasks!', error);
      }
    })
  }

  onTaskCreated(task: Task) {
    this.filteredTasks.push(task);
  }

  onTaskDeleted(taskId: number) {
    this.filteredTasks = this.filteredTasks.filter(task => task.id !== taskId);
  }

  onTaskCompleted(taskId: number) {
    const index = this.filteredTasks.findIndex(t => t.id === taskId);
    this.filteredTasks[index].isCompleted = true;
  }

  onSearch() {
    console.log(this.filter);
    this.filteredTasks = this.tasks.filter(t => t.title
      .toLowerCase().includes(this.filter.toLowerCase())
    )
  }

  onClearSearch() {
    this.filter = '';
    this.filteredTasks = this.tasks;
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    moveItemInArray(this.filteredTasks, event.previousIndex, event.currentIndex);
  }
}
