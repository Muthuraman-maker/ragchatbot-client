export interface ChatMessage {
    id: number;

    sender: 'USER' | 'AI';

    message: string;

    timestamp: Date;

    pdfContextUsed?: boolean;

    internetContextUsed?: boolean;

    pdfChunksRetrieved?: number;

    loading?: boolean;

}