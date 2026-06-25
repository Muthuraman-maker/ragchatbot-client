import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Upload } from '../upload/upload';
import { ChatComponent } from '../chat/chat';
import { Documents } from '../documents/documents';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Upload,
    Documents,
    ChatComponent
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
}