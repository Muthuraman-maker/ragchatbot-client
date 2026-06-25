import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DocumentEventService } from '../../core/services/document-event.service';
import { DocumentService } from '../../core/services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProgressDialog } from '../../shared/dialogs/upload-progress/upload-progress';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [

    CommonModule,

    MatCardModule,

    MatButtonModule,

    MatIconModule,

    MatProgressSpinnerModule

  ],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  private dialog = inject(MatDialog);

  private documentService = inject(DocumentService);

  private eventService = inject(DocumentEventService);

  private snackBar = inject(MatSnackBar);

  selectedFile?: File;

  uploading = false;

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedFile = input.files[0];

    }

  }

  chooseFile() {

    this.fileInput.nativeElement.click();

  }

  upload() {

    if (!this.selectedFile) {

      this.snackBar.open(
        "Please choose a PDF.",
        "Close",
        { duration: 3000 });

      return;

    }

    this.uploading = true;

    const dialogRef =
      this.dialog.open(

        UploadProgressDialog,

        {

          disableClose: true,

          width: '500px'

        }

      );

    const dialog =
      dialogRef.componentInstance;

    let step = 0;

    const timer = setInterval(() => {

      if (step < 5) {

        dialog.currentStep = step;

        step++;

      }

    }, 900);

    this.documentService
      .upload(this.selectedFile)
      .subscribe({

        next: response => {

          clearInterval(timer);

          dialog.currentStep = 5;

          setTimeout(() => {

            dialogRef.close();

          }, 500);

          this.uploading = false;

          this.snackBar.open(
            response.message,
            "Close",
            { duration: 3000 });

          this.selectedFile = undefined;

          this.fileInput.nativeElement.value = "";

          this.eventService.notifyUpload();

        },

        error: () => {

          clearInterval(timer);

dialogRef.close();

this.uploading=false;

          this.snackBar.open(
            "Upload Failed",
            "Close",
            { duration: 3000 });

        }

      });

  }
}
