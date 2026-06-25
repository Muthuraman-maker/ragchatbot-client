import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChatService } from '../../core/services/chat.service';
import { SelectedDocumentService } from '../../core/services/selected-document.service';

import { ChatRequest } from '../../core/models/chat-request';
import { ChatResponse } from '../../core/models/chat-response';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit {

  private chatService = inject(ChatService);

  private selectedDocumentService = inject(SelectedDocumentService);

  private snackBar = inject(MatSnackBar);

  documentId = "";

  question = "";

  searchMode = "PDF_ONLY";

  response?: ChatResponse;

  loading = false;

  ngOnInit(): void {

    this.selectedDocumentService
      .selectedDocument$
      .subscribe(id => {

        this.documentId = id;

      });

  }

  askAI() {

    if (!this.documentId) {

      this.snackBar.open(
        "Please select a document.",
        "Close",
        {
          duration:3000
        });

      return;

    }

    if (!this.question.trim()) {

      this.snackBar.open(
        "Please enter a question.",
        "Close",
        {
          duration:3000
        });

      return;

    }

    this.loading = true;

    const request: ChatRequest = {

      documentId: this.documentId,

      question: this.question,

      searchMode: this.searchMode

    };

    this.chatService
      .askQuestion(request)
      .subscribe({

        next: response => {

          this.response = response;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

}