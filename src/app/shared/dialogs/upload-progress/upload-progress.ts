import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './upload-progress.html',
  styleUrl: './upload-progress.css'
})
export class UploadProgressDialog {

  currentStep = 0;

  steps = [

    "Uploading PDF",

    "Extracting Text",

    "Splitting into Chunks",

    "Generating Embeddings",

    "Saving to Vector Database"

  ];

}