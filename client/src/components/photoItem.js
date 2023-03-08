import React, { Fragment, useState, useEffect } from "react";
import summer1 from '../photos/summer1.jpg';

function PhotoItem({ photos }) {
    return (
        <div className="list-group mt-2">{photos?.map(photo =>
            <a onClick={() => null} key={photo.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <img src={photo.data} width="500" height="500" />
                </div>
                <p className="mb-1">{photo.caption}</p>
            </a>
        )}
        </div>
    )
}
export default PhotoItem;