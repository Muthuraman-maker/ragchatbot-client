import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { DeleteConfirmDialogComponent } from '../../shared/dialogs/delete-confirm-dialog';
import { Subject, takeUntil } from 'rxjs';

import { DocumentService } from '../../core/services/document.service';
import { DocumentEventService } from '../../core/services/document-event.service';
import { SelectedDocumentService } from '../../core/services/selected-document.service';

import { DocumentMetadata } from '../../core/models/document-metadata';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class Documents implements OnInit, OnDestroy {

  private dialog = inject(MatDialog);

  private documentService = inject(DocumentService);

  private documentEventService = inject(DocumentEventService);

  private selectedDocumentService = inject(SelectedDocumentService);

  private snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();

  selectedDocumentId = "";

  documents: DocumentMetadata[] = [];

  loading = false;

  ngOnInit(): void {

    this.loadDocuments();

    this.documentEventService
        .documentUploaded$
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {

            this.loadDocuments();

        });

    this.selectedDocumentService
        .selectedDocument$
        .pipe(takeUntil(this.destroy$))
        .subscribe(document => {

            this.selectedDocumentId =
                document?.documentId ?? "";

        });

}
  loadDocuments() {

    this.loading = true;

    this.documentService
      .getDocuments()
      .subscribe({

        next: response => {

          this.documents = response;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  delete(document: DocumentMetadata) {

    const dialogRef = this.dialog.open(

        DeleteConfirmDialogComponent,

        {

            width: '420px',

            disableClose: true,

            data: {

                fileName: document.fileName

            }

        }

    );

    dialogRef.afterClosed().subscribe(result => {

        if (!result) {

            return;

        }

        this.documentService
            .deleteDocument(document.documentId)
            .subscribe({

                next: message => {

                    this.snackBar.open(

                        message,

                        "Close",

                        {

                            duration:3000

                        });

                    if(this.selectedDocumentId===document.documentId){

                        this.selectedDocumentId="";

                    }

                    this.loadDocuments();

                }

            });

    });

}
selectDocument(documentData: DocumentMetadata) {

    this.selectedDocumentId = documentData.documentId;

    this.selectedDocumentService.setDocument(documentData);
    document
        .getElementById('chat-section')
        ?.scrollIntoView({
            behavior: 'smooth'
        });

}
  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}