import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Picture, FormDataState } from "../types/index";
import { fetchPicturesApi, uploadPictureApi, fetchPictureByIdApi } from "../api/index";
import "../styles/PictureAlbum.css";

const PictureAlbum: React.FC = () => {

    const [pictures, setPictures] = useState<Picture[]>([]);
    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
    const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataState>({
        name: "",
        date: "",
        description: "",
        file: null,
        fileName: ""
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        // Fetch the pictures when the component mounts
        fetchPictures();
    }, []);

    const fetchPictures = async () => {
        try {
            const data = await fetchPicturesApi();
            setPictures(data);
        } catch {
            setError("Failed to load pictures");
        }
    };

    // Fetch detailed picture information
    const fetchPictureDetail = async (pictureId: number) => {
        setLoadingDetail(true);
        setError("");

        try {
            const pictureDetail = await fetchPictureByIdApi(pictureId);
            setSelectedPicture(pictureDetail);
        } catch (err) {
            setError("Failed to load picture details");
            console.error("Error fetching picture detail:", err);
        } finally {
            setLoadingDetail(false);
        }
    };

    // Handle clicking on a picture item
    const handlePictureClick = (pictureId: number) => {
        fetchPictureDetail(pictureId);
    };

    // Handle changes to regular text inputs and textarea fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle changes specifically to the file input field
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Update the form state with both the file itself and its name
            setFormData((prev) => ({ ...prev, file, fileName: file.name }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.name || !formData.file) {
            setError("Picture name and file are required");
            return;
        }

        // Create a FormData object to send the data
        const data = new FormData();
        data.append("Name", formData.name);
        if (formData.date) data.append("Date", formData.date);
        if (formData.description) data.append("Description", formData.description);
        data.append("File", formData.file);

        try {
            await uploadPictureApi(data);
            setSuccess("Picture uploaded successfully");
            fetchPictures();
            // Reset the form data after successful upload
            setFormData({ name: "", date: "", description: "", file: null, fileName: "" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to upload picture");
            }
        }
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form?")) {
            // Reset the form data
            setFormData({ name: "", date: "", description: "", file: null, fileName: "" });
        }
    };

    // Close picture detail view
    const closePictureDetail = () => {
        setSelectedPicture(null);
    };

    return (
        <div className="container">
            <section className="section">
                <h2 style={{ marginBottom: 16 }}>Uploaded Pictures</h2>
                {pictures.length === 0 ? (
                    <p className="noPictures">No pictures uploaded yet.</p>
                ) : (
                    <ul className="pictureList">
                        {pictures.map((pic) => (
                            <li
                                key={pic.id}
                                className="pictureListItem clickable"
                                onClick={() => handlePictureClick(pic.id)}
                                style={{ cursor: 'pointer' }}
                                title="Click to view picture and details"
                            >
                                <strong>{pic.id}</strong>: {pic.name}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Picture Detail Section */}
            {selectedPicture && (
                <section className="section pictureDetailSection">
                    <div className="pictureDetailHeader">
                        <h2>Picture Details</h2>
                        <button
                            onClick={closePictureDetail}
                            className="buttonSecondary closeButton"
                        >
                            ✕ Close
                        </button>
                    </div>

                    {loadingDetail ? (
                        <p>Loading picture details...</p>
                    ) : (
                        <div className="pictureDetailContent">
                            <div className="pictureInfo">
                                <h3>{selectedPicture.name}</h3>
                                <p><strong>ID:</strong> {selectedPicture.id}</p>
                                {selectedPicture.date && (
                                    <p><strong>Date:</strong> {new Date(selectedPicture.date).toLocaleString()}</p>
                                )}
                                {selectedPicture.description && (
                                    <p><strong>Description:</strong> {selectedPicture.description}</p>
                                )}
                            </div>

                            {selectedPicture.content && (
                                <div className="pictureImageContainer">
                                    <img
                                        src={`data:image/*;base64,${selectedPicture.content}`}
                                        alt={selectedPicture.name}
                                        className="pictureImage"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            objectFit: 'contain',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </section>
            )}

            <section className="section">
                <h2 style={{ marginBottom: 20 }}>Add New Picture</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <label className="label">Picture Name*:</label>
                        <input
                            name="name"
                            maxLength={50}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="label">Picture Date:</label>
                        <input
                            name="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="label">Picture Description:</label>
                        <textarea
                            name="description"
                            maxLength={250}
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="input textarea"
                        />
                    </div>

                    <div>
                        <label className="label">Picture File*:</label>
                        <input
                            name="fileName"
                            value={formData.fileName}
                            readOnly
                            required
                            className="input readOnlyInput"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById("fileInput")?.click()}
                            className="buttonBrowser"
                        >
                            Picture Browser
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <button type="submit" className="buttonPrimary">
                            Add Picture
                        </button>
                        <button type="button" onClick={handleReset} className="buttonSecondary">
                            Reset
                        </button>
                    </div>

                    {error && <div className="errorText">{error}</div>}
                    {success && <div className="successText">{success}</div>}
                </form>
            </section>
        </div>
    );
};

export default PictureAlbum;