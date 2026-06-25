# Phase 4 - Angular Frontend

## Objective

Develop a modern, responsive Angular frontend that communicates with the Spring Boot AI backend and provides an intuitive user experience for document management and AI-powered chat.

---

# Feature 17 - Dashboard

### Purpose

The Dashboard acts as the landing page of the application and hosts all major features.

Instead of navigating between multiple pages, all features are displayed in a single dashboard for a seamless workflow.

### Dashboard Layout

```text
Dashboard
│
├── Upload PDF
│
├── Uploaded Documents
│
└── AI Chat
```

### Benefits

* Better user experience
* Less navigation
* Similar workflow to ChatGPT and Microsoft Copilot
* Easy to extend with future features

---

# Feature 18 - Upload Component

### Purpose

Allows users to upload PDF documents that will be converted into embeddings and stored in the Vector Database.

### Technologies Used

* Angular Standalone Component
* Angular Material
* HttpClient
* Reactive REST Communication

### Workflow

```text
User
    │
Select PDF
    │
Click Upload
    │
Angular Upload Component
    │
DocumentService
    │
Spring Boot Upload API
    │
Vector Database
```

### Features

* PDF file selection
* Upload progress indicator
* Success and error notifications
* Automatic refresh of uploaded document list

---

# Feature 19 - Documents Component

### Purpose

Displays every uploaded document stored in the backend.

### Endpoint Used

```http
GET /api/documents
```

### Features

* Responsive document cards
* File name display
* Upload timestamp
* Chunk count
* Delete document
* Select document for AI Chat

### Workflow

```text
Application Starts
        │
        ▼
GET /api/documents
        │
        ▼
Display Document Cards
```

---

# Feature 20 - Delete Document

### Endpoint

```http
DELETE /api/documents/{documentId}
```

### Purpose

Remove both:

* Document metadata
* Vector embeddings

from the system.

### Workflow

```text
Delete Button
      │
Angular
      │
DELETE API
      │
Spring Boot
      │
Delete Metadata
      │
Delete Vector Embeddings
      │
Refresh Document List
```

---

# Feature 21 - Selected Document Service

### Purpose

Enable communication between independent Angular components.

Instead of tightly coupling the Documents Component with the Chat Component, a shared service is used.

### Architecture

```text
Documents Component
        │
Select Document
        │
        ▼
SelectedDocumentService
        │
        ▼
Chat Component
```

### Benefits

* Loose coupling
* Reusable components
* Easier maintenance
* Enterprise Angular architecture

---

# Feature 22 - Chat Component (Version 1)

### Objective

Allow users to ask AI-powered questions against the selected PDF using the backend RAG service.

### Backend Endpoint

```http
POST /api/chat
```

### Request

```json
{
  "documentId": "UUID",
  "question": "What is Spring Boot?",
  "searchMode": "PDF_ONLY"
}
```

### Response

```json
{
  "answer": "...",
  "searchMode": "PDF_ONLY",
  "pdfContextUsed": true,
  "internetContextUsed": false,
  "pdfChunksRetrieved": 5
}
```

---

## Search Modes

The Chat Component supports three search strategies.

### PDF_ONLY

```text
Question
    │
Vector Database
    │
Relevant Chunks
    │
OpenAI
    │
Answer
```

Only PDF content is used.

---

### INTERNET_ONLY

```text
Question
    │
Tavily Search
    │
OpenAI
    │
Answer
```

Only live internet information is used.

---

### PDF_AND_INTERNET

```text
Question
      │
 ┌──────────────┐
 │              │
PDF Search   Internet Search
 │              │
 └──────┬───────┘
        ▼
Combined Prompt
        │
     OpenAI
        │
      Answer
```

PDF content is treated as the primary source, while internet information is used only as supplementary context.

---

## Chat Workflow

```text
User
   │
Ask Question
   │
Angular Chat Component
   │
ChatService
   │
Spring Boot
   │
Retrieve PDF Context
   │
(Optional Internet Search)
   │
OpenAI
   │
Return Response
   │
Display Answer
```

---

## Features Implemented

* AI question input
* Search mode selection
* Loading indicator while waiting for AI response
* AI response display
* Source usage indicators
* Retrieved chunk count
* Validation for empty questions
* Validation for document selection

---

## Component Communication

```text
Upload Component
        │
Upload Successful
        │
DocumentEventService
        │
Documents Component Refresh
        │
User Selects Document
        │
SelectedDocumentService
        │
Chat Component
        │
Ask AI
```

---

## Current Frontend Architecture

```text
DashboardComponent
│
├── UploadComponent
│
├── DocumentsComponent
│
└── ChatComponent
        │
        ▼
Spring Boot REST APIs
        │
        ▼
OpenAI
PGVector
Tavily
PostgreSQL
```

---

## Future Enhancements (Version 2)

The next version of the Chat Component will include:

* ChatGPT-style conversation history
* User and AI message bubbles
* Markdown rendering
* Copy response button
* AI typing indicator
* Auto-scroll to latest message
* Conversation memory
* Response citations
* Better mobile responsiveness
