import { Picture } from "../types/index";

export async function fetchPicturesApi(): Promise<Picture[]> {
    // Fetch pictures from the API
    const res = await fetch("/api/Pictures");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
}

export async function uploadPictureApi(formData: FormData): Promise<void> {
    // Upload a picture to the API (would have been better to use POST [in my opinion], but uses PUT as per requirements)
    const res = await fetch("/api/Pictures", {
        method: "PUT",
        body: formData,
    });
    if (!res.ok) {
        const errorText = await res.text();
        //if the server returns an error message [eg file name already exists], use it; otherwise, use a generic message
        throw new Error(errorText || "Upload failed");
    }
}

export const fetchPictureByIdApi = async (id: number): Promise<Picture> => {
    const response = await fetch(`/api/pictures/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch picture with ID ${id}`);
    }

    return response.json();
};