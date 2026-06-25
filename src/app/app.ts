import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Upload } from "./features/upload/upload";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'chatbot-client';
}
