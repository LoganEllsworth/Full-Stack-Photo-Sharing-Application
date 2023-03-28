import React, { Fragment, useState } from "react";

import Albums from './albums';

function Profile({token}) {
    const [showAlbums, setShowAlbums] = useState(true);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    function changeTab(tab) {
        switch(tab) {
            case "albums":
                setShowAlbums(true);
                setShowFollowing(false);
                setShowFollowers(false);
                document.getElementById("albums").className = "nav-link active";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link";
                break;
            case "following":
                setShowAlbums(false);
                setShowFollowing(true);
                setShowFollowers(false);
                document.getElementById("albums").className = "nav-link";
                document.getElementById("following").className = "nav-link active";
                document.getElementById("followers").className = "nav-link";
                break;
            case "followers":
                setShowAlbums(false);
                setShowFollowing(false);
                setShowFollowers(true);
                document.getElementById("albums").className = "nav-link";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link active";
                break;
            default:
                setShowFollowing(false);
                setShowAlbums(false);
        }
    }

    return (
        <Fragment>
            <div className="w-50 bg-light rounded mx-auto">
                <div className="container">
                    <h1>{token.firstname + " " + token.lastname}</h1>
                    {token.hometown && <div className="row">
                        Hometown: {token.hometown}
                    </div>}
                    {token.gender && <div className="row">
                        Gender: {token.gender}
                    </div>}
                    <div className="row">
                        Birthday: {new Date(token.dob).toLocaleDateString()}
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className = "nav-link active" id="albums" onClick={() => changeTab("albums")}>Albums</a>
                    </li>
                    <li className="nav-item">
                        <a className = "nav-link" id="following" onClick={() => changeTab("following")}>Following</a>
                    </li>
                    <li className="nav-item">
                        <a className = "nav-link" id="followers" onClick={() => changeTab("followers")}>Followers</a>
                    </li>
                </ul>
                {showAlbums && <Albums userId={token.id}/>}
                {showFollowing && <p>Need query that selects destination from user_friends table where origin = token.id</p>}
                {showFollowers && <p>Need query that selects origin from user_friends table where destination = token.id</p>}
            </div>
        </Fragment>
    );
}

export default Profile;