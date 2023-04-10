import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './styles/photoItem.css';
import './commentItem';

import CommentItems from "./commentItem";
import LikeItem from "./likeItem";
import TagItem from "./tagItem";


function PhotoItem({ userId, photos, pageType }) {

    const [inputVal, writtenComment] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUser)
            navigate(`/profile/${selectedUser.id}`);
    }, [selectedUser])

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
            await fetch("http://localhost:5000/api/comment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location.href = "/profile";
        } catch (e) {
            console.error(e.message);
        }
    }

    const deletePhoto = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/photo/delete/${id}`);
            window.location.href = "/profile";
        } catch (e) {
            console.error(e.message);
        }
    }

    const likePhoto = async (photo) => {
        try {
            if (photo.likes.some(like => like.userid === userId)) {
                const body = {
                    "photoid": photo.id,
                    "userid": userId,
                }
                await fetch("http://localhost:5000/api/likes/delete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                window.location.href = "/profile";
            } else {
                const body = {
                    "photoid": photo.id,
                    "userid": userId,
                }
                await fetch("http://localhost:5000/api/likes/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                window.location.href = "/profile";
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="list-group mt-2">{photos?.map(photo =>
            <li key={photo.id} className="list-group-item list-group-item-action flex-column align-items-start">
                {pageType === 'search' && <p>User:</p>}
                {pageType === 'search' && <div onClick={() => setSelectedUser(photo.user)} className="list-group-item mb-1">{photo.user.firstname + " " + photo.user.lastname}</div>}
                <div className="mb-3">
                    <p>Tags:</p>
                    {<TagItem tags={photo.tags} />}
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <img src={photo.data} width="500" height="500" />
                    <div className="comment-container">
                        <div className="comment-box">
                        
                            {<CommentItems comments={photo.comments} pageType={pageType} />}
                        
                        </div>
                        <div className="message-container">
                            <form onSubmit={onSubmitForm}>
                                <input type="text" value={inputVal} placeholder="Write a comment!" className="type-comment" onChange={e => writtenComment(e.target.value)}></input>
                                <button onClick={() => { setSelectedPhoto(photo.id) }} className="send-comment">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                <p className="mb-1">Caption: {photo.caption}</p>
                <div className="mb-3">
                    <p>Likes:</p>
                    {<LikeItem likes={photo.likes} />}
                </div>
                <button onClick={() => likePhoto(photo)} className={photo.likes.some(like => like.userid === userId) ? "btn btn-danger" : "btn btn-success"}>{photo.likes.length} &lt;3</button>
                {pageType === 'profile' && <button onClick={() => deletePhoto(photo.id)} className={"btn btn-danger"}>Delete Photo</button>}
            </li>
        )}
        </div>
    )
}
export default PhotoItem;