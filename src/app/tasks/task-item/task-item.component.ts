import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateTask } from '../task.interfaces';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDeleteDialogComponent } from '../task-delete-dialog/task-delete-dialog.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();
  editedTask: UpdateTask | null = null;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog) { }

  onOpenDeleteDialog(taskId: number) {
    const dialogRef = this.dialog.open(TaskDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onTaskDeleted(taskId);
      }
    });
  }

  onTaskDeleted(taskId: number) {
    this.taskService.delete(taskId).subscribe({
      next: () => {
        this.taskDeleted.emit(taskId);
      }
    })
  }

  onTaskOpenedEditor(taskId: number) {
    this.editedTask = {
      id: this.task.id,
      title: this.task.title
    }
  }

  onSave(task: UpdateTask) {
    this.taskService.update(task).subscribe({
      next: updatedTask => {
        this.task = updatedTask;
        this.editedTask = null;
      },
      error: error => {
        console.error('There was an error updating the task!', error);
        alert(error.error);
      }
    });
  }

  onBlur(event: FocusEvent) {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (
        activeElement && activeElement.id === 'save-btn'
      ) {
        return;
      }
      this.cancelEdit();
    }, 0);
  }

  cancelEdit() {
    this.editedTask = null;
  }

  onComplete(taskId: number) {
    this.taskService.complete(taskId).subscribe({
      next: (updatedTask) => {
        this.task = updatedTask;
      }
    });
  }

  get isEdit(): boolean {
    return this.editedTask !== null;
  }
}
