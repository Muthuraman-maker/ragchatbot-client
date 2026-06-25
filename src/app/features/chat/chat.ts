import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChatService } from '../../core/services/chat.service';
import { SelectedDocumentService } from '../../core/services/selected-document.service';

import { ChatRequest } from '../../core/models/chat-request';
import { ChatMessage } from '../../core/models/chat-message';
import { DocumentMetadata } from '../../core/models/document-metadata';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule
],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit {

  @ViewChild('chatHistory')

  chatHistory!: ElementRef;

  private chatService = inject(ChatService);

  private selectedDocumentService = inject(SelectedDocumentService);

  private snackBar = inject(MatSnackBar);

  selectedDocument?: DocumentMetadata;

  question = "";

  searchMode = "PDF_ONLY";

  messages: ChatMessage[] = [];
  private messageCounter = 0;

  loading = false;

  ngOnInit(): void {

    this.selectedDocumentService
      .selectedDocument$
      .subscribe(document => {

        this.selectedDocument = document!;

      });

  }

  askAI() {

    if (!this.selectedDocument) {

      this.snackBar.open(
        "Please select a document.",
        "Close",
        {
          duration: 3000
        });

      return;
    }

    if (!this.question.trim()) {

      return;
    }

    const question = this.question;

    this.question = "";

    /* USER MESSAGE */

    this.messages.push({

      id: ++this.messageCounter,

      sender: 'USER',

      message: question,

      timestamp: new Date()

    });

    /* AI THINKING */

    const aiMessage: ChatMessage = {

      id: ++this.messageCounter,

      sender: 'AI',

      message: "Thinking...",

      timestamp: new Date(),

      loading: true

    };

    this.messages.push(aiMessage);

    this.scrollToBottom();

    const request: ChatRequest = {

      documentId:
        this.selectedDocument.documentId,

      question: question,

      searchMode: this.searchMode

    };

    this.loading = true;

    this.chatService
      .askQuestion(request)
      .subscribe({

        next: response => {

          aiMessage.loading = false;

          aiMessage.message =
            response.answer;

          aiMessage.pdfContextUsed =
            response.pdfContextUsed;

          aiMessage.internetContextUsed =
            response.internetContextUsed;

          aiMessage.pdfChunksRetrieved =
            response.pdfChunksRetrieved;

          this.loading = false;

          this.scrollToBottom();

        },

        error: () => {

          aiMessage.loading = false;

          aiMessage.message =
            "Unable to get AI response.";

          this.loading = false;

        }

      });

  }
  scrollToBottom() {

    setTimeout(() => {

      if (this.chatHistory) {

        this.chatHistory
          .nativeElement
          .scrollTop =
          this.chatHistory
            .nativeElement
            .scrollHeight;

      }

    });

  }
  copy(text: string) {

    navigator.clipboard.writeText(text);

    this.snackBar.open(

      "Copied",

      "Close",

      {

        duration: 2000

      });

  }
  clearConversation(){

    this.messages=[];

}
send(event: Event) {

    const keyboardEvent = event as KeyboardEvent;

    if (!keyboardEvent.shiftKey) {

        event.preventDefault();

        this.askAI();

    }

}
}