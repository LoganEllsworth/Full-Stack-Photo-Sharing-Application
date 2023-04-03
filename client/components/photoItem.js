import React, { Fragment, useState, useEffect } from "react";

function PhotoItem({ photos, pageType }) {

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
                <div className="d-flex w-100 justify-content-between">
                    <img src={photo.data} width="500" height="500" />
                </div>
                <p className="mb-1">{photo.caption}</p>
                {pageType === 'profile' && <button onClick={() => deletePhoto(photo.id)} className={"btn btn-danger"}>Delete Photo</button>}
            </li>
        )}
        </div>
    )
}
export default PhotoItem;