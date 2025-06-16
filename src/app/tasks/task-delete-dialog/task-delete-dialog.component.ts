import { Component, EventEmitter, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-task-delete-dialog',
  templateUrl: './task-delete-dialog.component.html'
})
export class TaskDeleteDialogComponent {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<TaskDeleteDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
