import React, { Fragment, useState, useEffect } from "react";
import { Buffer } from 'buffer';
import ImageUploader from 'react-images-upload';
import AlbumItem from "./albumItem";
import PhotoItem from "./photoItem";

function Albums({userId}) {
    const [newAlbum, setNewAlbum] = useState(false);
    const [albums, setAlbums] = useState();
    const [album, setAlbum] = useState();
    const [photos, setPhotos] = useState();
    const [name, setName] = useState("");
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const [viewAlbum, setViewAlbum] = useState(false);
    const [newPhoto, setNewPhoto] = useState(true);
    const [caption, setCaption] = useState("");
    const [photoData, setPhotoData] = useState("");

    useEffect(() => {
        getAlbumsByUserId();
    }, [])

    useEffect(() => {
        getPhotosByAlbumId();
    }, [album])

    const getAlbumsByUserId = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/album/user/${userId}`);
            const results = await response.json();
            setAlbums(results?.albums);
            return results?.albums;
        } catch (e) {
            console.error(e.message);
        }
    }

    const onSubmitForm = async (e) => {
        setMessage();
        e.preventDefault();
        switch (e.target.id) {
            case "album":
                if (!name) {
                    setSuccess(false);
                    setMessage("Please enter a title.");
                    return;
                }
                try {
                    const body = {
                        "userid": userId,
                        "name": name,
                        "createdat":  new Date().toLocaleString(),
                    }
                    const response = await fetch("http://localhost:5000/api/album/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });
                    const results = await response.json();
                    setSuccess(results?.success);
                    setMessage(results?.message);
                    if (results.success) {
                        clearForm();
                        window.location.href = "/profile";
                    }
                } catch (e) {
                    console.error(e.message);
                }
                break;
            case "photo":
                if (!photoData) {
                    setSuccess(false);
                    setMessage("Please upload a photo.");
                    return;
                }
                try {
                    const formData = new FormData();
                    formData.append('albumid', album.id);
                    formData.append('caption', caption);
                    formData.append('data', photoData);

                    const response = await fetch("http://localhost:5000/api/photo/create", {
                        method: "POST",
                        body: formData
                    });

                    const results = await response.json();
                    setSuccess(results?.success);
                    setMessage(results?.message);
                    console.log(success);
                    console.log(results);
                    if (results.success) {
                        clearForm();
                        window.location.href = "/profile";
                    }
                } catch (e) {
                    console.error(e.message);
                }
                break;
        }
        
    }

    const clearForm = () => {
        setName("");
        setCaption("");
        setMessage();
        setPhotoData();
    };

    const getPhotosByAlbumId = async () => {
        if (album) {
            try {
                const response = await fetch(`http://localhost:5000/api/photo/album/${album.id}`);
                const results = await response.json();
                setPhotos(results?.photos);
                setViewAlbum(true);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    const createPhoto = async (photo) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(photo[0]);
        reader.onload = () => resolve(setPhotoData(reader.result));
        reader.onerror = error => reject(error);
    });

    return (
        <Fragment>
            {!newAlbum && !viewAlbum && <button className="btn btn-success mt-2" onClick={() => setNewAlbum(!newAlbum)}>+ New</button>}
            {newAlbum &&
                <form id="album" onSubmit={onSubmitForm}>
                    <div className="col  mt-3">
                        <h3>Create Album</h3>
                        {message && <p className={success ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</p>}
                        <div className="row mt-2">
                            <div className="col">
                                <p>Title:</p>
                            </div>
                            <div className="col-10">
                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button className="btn btn-success">Create</button>
                            <button onClick={() => {setNewAlbum(false); clearForm()}}className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>}
            {!viewAlbum && <div className="list-group mt-2">{albums?.map(album =>
                <a onClick={() => {setAlbum(album)}} key={album.id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <AlbumItem album={album} />
                </a>
            )}
            </div>}
            {viewAlbum && <div className="mt-2">
                <button className="btn btn-secondary" onClick={() => setViewAlbum(false)}>Back</button>
                <button className="btn btn-success" onClick={() => setNewPhoto(true)}>+ Photo</button>
                <button className="btn btn-danger" onClick={() => setViewAlbum(false)}>Delete Album</button>
                {newPhoto &&
                <form id="photo" onSubmit={onSubmitForm}>
                    <div className="col mt-3">
                        <h3>New Photo</h3>
                        {message && <p className={success ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</p>}
                        <div className="row mt-2">
                            <div className="col">
                                <p>Caption:</p>
                            </div>
                            <div className="col-10">
                                <input type="text" className="form-control" value={caption} onChange={e => setCaption(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <ImageUploader 
                                withIcon={true}
                                buttonText='Upload Image'
                                onChange={createPhoto}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                singleImage={true}
                                withPreview={true}
                            />
                        </div>
                        <div className="mt-2">
                            <button className="btn btn-success">Post</button>
                            <button onClick={() => {setNewPhoto(false); clearForm()}}className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>}
                <PhotoItem photos={photos} />
            </div>}
        </Fragment>
    );
}

export default Albums;