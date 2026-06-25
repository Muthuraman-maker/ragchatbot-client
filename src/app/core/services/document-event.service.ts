import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentEventService {

  private documentUploadedSource =
      new Subject<void>();

  documentUploaded$ =
      this.documentUploadedSource.asObservable();

  notifyUpload() {

    this.documentUploadedSource.next();

  }

}