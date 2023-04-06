import React, { Fragment, useState, useEffect } from "react";
import './styles/photoItem.css';
import './commentItem';
import CommentItems from "./commentItem";


function PhotoItem({ userId, photos, pageType }) {

    const [commentText, setNewComment] = useState(false);
    const [inputVal, writtenComment] = useState('');
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState();

    useEffect(() => {
        console.log(photos);
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!inputVal) {
            setSuccess(false);
            setMessage("Please enter a search parameter.");
            return;
        }
        try {
            const body = {
                "userid": userId,
                "photoid": selectedPhoto,
                "text": inputVal,
                "createdAt": new Date().toLocaleString()
            }
            console.log(photos);
            console.log(body.userid + " " + body.photoid + " " + body.text + " " + body.createdAt)
            const response = await fetch("http://localhost:5000/api/comment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const results = await response.json();
            setSuccess(results?.success);
            setMessage(results?.message);
            window.location.href = "/profile";
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(() => {
        console.log(photos);
    }, [])

    const deletePhoto = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/photo/delete/${id}`);
            window.location.href = "/profile";
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="list-group mt-2">{photos?.map(photo =>
            <li key={photo.id} className="list-group-item list-group-item-action flex-column align-items-start">
                {pageType === 'search' && <p className="mb-1">{photo.user.firstname + " " + photo.user.lastname}</p>}
                <div className="picture-tags">
                    <p></p>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <img src={photo.data} width="500" height="500" />
                    <div className="comment-container">
                        <div className="comment-box">
                            {<CommentItems comments={photo.comments} />}
                        </div>
                        <div className="message-container">
                            <form onSubmit={onSubmitForm}>
                                <input type="text" value={inputVal} placeholder="Write a comment!" className="type-comment" onChange={e => writtenComment(e.target.value)}></input>
                                <button onClick={() => { setSelectedPhoto(photo.id) }} className="send-comment">Send</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
                <p className="mb-1">{photo.caption}</p>
                {pageType === 'profile' && <button onClick={() => deletePhoto(photo.id)} className={"btn btn-danger"}>Delete Photo</button>}
            </li>
        )}
        </div>
    )
}
export default PhotoItem;