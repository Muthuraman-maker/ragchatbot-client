export interface ChatResponse{

    answer:string;

    searchMode:string;

    pdfContextUsed:boolean;

    internetContextUsed:boolean;

    pdfChunksRetrieved:number;

}