import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-confirm-dialog.html',
  styleUrl: './delete-confirm-dialog.css'
})
export class DeleteConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {

      fileName: string

    }
  ) {

  }

  cancel() {

    this.dialogRef.close(false);

  }

  delete() {

    this.dialogRef.close(true);

  }

}