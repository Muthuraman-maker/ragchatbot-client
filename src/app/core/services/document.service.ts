import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UploadResponse } from '../models/upload-response';
import { DocumentMetadata } from '../models/document-metadata';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private http = inject(HttpClient);

  upload(file: File): Observable<UploadResponse> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<UploadResponse>(
      `${environment.apiUrl}/documents/upload`,
      formData
    );
  }

  getDocuments(): Observable<DocumentMetadata[]> {

    return this.http.get<DocumentMetadata[]>(
        `${environment.apiUrl}/documents`
    );

}

deleteDocument(documentId: string): Observable<string> {

    return this.http.delete(
        `${environment.apiUrl}/documents/${documentId}`,
        {
            responseType: 'text'
        }
    );

}
}