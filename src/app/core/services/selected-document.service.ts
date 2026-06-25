import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DocumentMetadata } from '../models/document-metadata';

@Injectable({
  providedIn: 'root'
})
export class SelectedDocumentService {

  private selectedDocumentSubject =
    new BehaviorSubject<DocumentMetadata | null>(null);

  selectedDocument$ =
    this.selectedDocumentSubject.asObservable();

  setDocument(document: DocumentMetadata) {

    this.selectedDocumentSubject.next(document);

  }

}