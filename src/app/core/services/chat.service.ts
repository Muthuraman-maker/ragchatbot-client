import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ChatRequest } from '../models/chat-request';

import { ChatResponse } from '../models/chat-response';

@Injectable({
  providedIn:'root'
})
export class ChatService{

    private http=inject(HttpClient);

    askQuestion(request:ChatRequest):Observable<ChatResponse>{

        return this.http.post<ChatResponse>(
            `${environment.apiUrl}/chat`,
            request
        );

    }

}