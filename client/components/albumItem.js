import React, { Fragment, useState } from "react";

function AlbumItem({ album }) {
    return (
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{album.name}</h5>
            <small>{"Created on: " + new Date(album.createdat).toLocaleDateString()}</small>
        </div>
    );
}

export default AlbumItem;