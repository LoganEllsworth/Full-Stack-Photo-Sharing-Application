import React, { Fragment, useState } from "react";

import Albums from './albums';
import Friends from './friends';
import Tags from './tags';

function Profile({token}) {
    const [showAlbums, setShowAlbums] = useState(true);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [users, setUsers] = useState();

    function changeTab(tab) {
        switch(tab) {
            case "albums":
                setShowAlbums(true);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link active";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link";
                break;
            case "following":
                getFriends();
                setShowAlbums(false);
                setShowFollowing(true);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link";
                document.getElementById("following").className = "nav-link active";
                document.getElementById("followers").className = "nav-link";
                break;
            case "followers":
                getFollowers();
                setShowAlbums(false);
                setShowFollowing(false);
                setShowFollowers(true);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link active";
                break;
            case "tags":
                setShowAlbums(false);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(true);
                document.getElementById("tags").className = "nav-link active";
                document.getElementById("albums").className = "nav-link";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link";
                break;
            default:
                setShowAlbums(true);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link active";
                document.getElementById("following").className = "nav-link";
                document.getElementById("followers").className = "nav-link";
                break;
        }
    }

    const getFriends = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/friend/friends/${token.id}`);
            const results = await response.json();
            if (results.success) {
                setUsers(results.rows);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const getFollowers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/friend/followers/${token.id}`);
            const results = await response.json();
            if (results.success) {
                setUsers(results.rows);
            }
        } catch (e) {
            console.error(e.message);
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
                    <li className="nav-item">
                        <a className = "nav-link" id="tags" onClick={() => changeTab("tags")}>Tags</a>
                    </li>
                </ul>
                {showAlbums && <Albums userId={token.id}/>}
                {(showFollowing || showFollowers) && <Friends token={token} users={users} update={() => {window.location.href = "/profile"}}/>}
                {showTags && <Tags userId={token.id}/>}
            </div>
        </Fragment>
    );
}

export default Profile;