import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedDocumentService } from '../../core/services/selected-document.service';
import { DocumentMetadata } from '../../core/models/document-metadata';

@Component({
  selector: 'app-selected-document',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './selected-document.html',
  styleUrl: './selected-document.css'
})
export class SelectedDocumentComponent implements OnInit {

  private selectedDocumentService = inject(SelectedDocumentService);

  selectedDocument?: DocumentMetadata;

  ngOnInit(): void {

    this.selectedDocumentService
      .selectedDocument$
      .subscribe(document => {

        this.selectedDocument = document ?? undefined;

      });

  }

}