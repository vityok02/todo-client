import { IError as Error } from '../../shared/interfaces/IError';
import { TaskService } from './../task.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { CreateTask, Task } from '../task.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})

export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ])
  });

  error: Error = {
    hasError: false,
    message: ''
  };

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(
    private taskService: TaskService) {}

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    let task: CreateTask = {
      title: this.taskForm.value.title!
    }

    this.taskService.create(task).subscribe({
      next: createdTask => {
        this.taskForm.reset();
        this.taskCreated.emit(createdTask);
        this.error.hasError = false;
        this.error.message = '';
      },
      error: error => {
        this.error.hasError = true;
        this.error.message = error.error;
        console.error('There was an error creating the task!', error);
      }
    })
  }
}
