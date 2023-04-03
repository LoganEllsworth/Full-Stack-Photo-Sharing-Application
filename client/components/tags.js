import React, { Fragment, useState, useEffect } from "react";

import PhotoItem from "./photoItem";

function Tags({userId}) {
    const [tags, setTags] = useState();
    const [tag, setTag] = useState();
    const [photos, setPhotos] = useState();
    const [viewTag, setViewTag] = useState(false);

    useEffect(() => {
        getTagsByUserId();
    }, [])

    useEffect(() => {
        getPhotosByTagName();
    }, [tag])

    const getTagsByUserId = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tags/user/${userId}`);
            const results = await response.json();
            setTags(results?.tags);
            return results?.tags;
        } catch (e) {
            console.error(e.message);
        }
    }

    const getPhotosByTagName = async () => {
        if (tag) {
            try {
                const body = {
                    "name": tag.name,
                    "id": userId,
                }
                const response = await fetch(`http://localhost:5000/api/photo/tag/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const results = await response.json();
                setPhotos(results?.photos);
                setViewTag(true);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    return (
        <Fragment>
            {!viewTag && <div className="list-group mt-2">{tags?.map(tag =>
                <a onClick={() => {setTag(tag)}} key={tag.id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <h5 className="mb-1">{tag.name}</h5>
                </a>
            )}
            </div>}
            {viewTag && <div className="mt-2">
                <button className="btn btn-secondary" onClick={() => setViewTag(false)}>Back</button>
                <PhotoItem photos={photos} pageType={'profile'}/>
            </div>}
        </Fragment>
    );
}

export default Tags;