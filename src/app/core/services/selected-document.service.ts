import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class SelectedDocumentService{

    private selectedDocument=
        new BehaviorSubject<string>("");

    selectedDocument$=
        this.selectedDocument.asObservable();

    setDocument(documentId:string){

        this.selectedDocument.next(documentId);

    }

}