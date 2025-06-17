
// picture interface cotains only id and name, not the full picture object, since that is all we need to display - it matches the PIctureDTO object from the API
export interface Picture {
    id: number;
    name: string;
}

export interface FormDataState {
    name: string;
    date: string;
    description: string;
    file: File | null;
    fileName: string;
}