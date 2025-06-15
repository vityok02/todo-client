import { TaskService } from './../task.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ITask } from '../ITask';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})


export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl<string>('')
  });
  @Output() taskCreated = new EventEmitter<ITask>();

  constructor(
    private taskService: TaskService) {}

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    let task: ITask = {
      title: this.taskForm.value.title!
    }

    this.taskService.create(task).subscribe({
      next: createTask => {
        this.taskForm.reset();
        this.taskCreated.emit(createTask);
      },
      error: error => {
        console.error('There was an error creating the task!', error);
      }
    })
  }
}
