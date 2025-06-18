export interface Picture {
    id: number;
    name: string
    content?: string; // Base64 encoded image content         //these properties only exist when retieving the actual picture and metadata, not the list of pictures
    date?: string;                                            //
    description?: string;                                     //
}

export interface FormDataState {
    name: string;
    date: string;
    description: string;
    file: File | null;
    fileName: string;
}