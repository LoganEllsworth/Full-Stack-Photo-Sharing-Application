import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Albums from './albums';
import Friends from './friends';
import Tags from './tags';

function Profile({token}) {
    const [showAlbums, setShowAlbums] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [users, setUsers] = useState();
    const [user, setUser] = useState(token);
    const { id } = useParams();

    useEffect(() => {
        getUserById(id ? id : user.id);
    }, [])

    function changeTab(tab) {
        switch(tab) {
            case "albums":
                setShowAlbums(true);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link active";
                token.id === user.id ? document.getElementById("following").className = "nav-link" : null;
                token.id === user.id ? document.getElementById("followers").className = "nav-link" : null;
                break;
            case "following":
                getFriends();
                setShowAlbums(false);
                setShowFollowing(true);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link";
                token.id === user.id ? document.getElementById("following").className = "nav-link active" : null;
                token.id === user.id ? document.getElementById("followers").className = "nav-link" : null;
                break;
            case "followers":
                getFollowers();
                setShowAlbums(false);
                setShowFollowing(false);
                setShowFollowers(true);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link";
                token.id === user.id ? document.getElementById("following").className = "nav-link" : null;
                token.id === user.id ? document.getElementById("followers").className = "nav-link active" : null;
                break;
            case "tags":
                setShowAlbums(false);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(true);
                document.getElementById("tags").className = "nav-link active";
                document.getElementById("albums").className = "nav-link";
                token.id === user.id ? document.getElementById("following").className = "nav-link" : null;
                token.id === user.id ? document.getElementById("followers").className = "nav-link" : null;
                break;
            default:
                setShowAlbums(true);
                setShowFollowing(false);
                setShowFollowers(false);
                setShowTags(false);
                document.getElementById("tags").className = "nav-link";
                document.getElementById("albums").className = "nav-link active";
                token.id === user.id ? document.getElementById("following").className = "nav-link" : null;
                token.id === user.id ? document.getElementById("followers").className = "nav-link" : null;
                break;
        }
    }

    const getUserById = async (userid) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userid}`);
            const results = await response.json();
            if (results.success) {
                setUser(results.user);
                setShowAlbums(true);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const getFriends = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/friend/friends/${user.id}`);
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
            const response = await fetch(`http://localhost:5000/api/friend/followers/${user.id}`);
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
                    <h1>{user.firstname + " " + user.lastname}</h1>
                    {user.hometown && <div className="row">
                        Hometown: {user.hometown}
                    </div>}
                    {user.gender && <div className="row">
                        Gender: {user.gender}
                    </div>}
                    <div className="row">
                        Birthday: {new Date(user.dob).toLocaleDateString()}
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className = "nav-link active" id="albums" onClick={() => changeTab("albums")}>Albums</a>
                    </li>
                    {token.id === user.id && <li className="nav-item">
                        <a className = "nav-link" id="following" onClick={() => changeTab("following")}>Following</a>
                    </li>}
                    {token.id === user.id && <li className="nav-item">
                        <a className = "nav-link" id="followers" onClick={() => changeTab("followers")}>Followers</a>
                    </li>}
                    <li className="nav-item">
                        <a className = "nav-link" id="tags" onClick={() => changeTab("tags")}>Tags</a>
                    </li>
                </ul>
                {showAlbums && <Albums userId={user.id} edit={token.id === user.id ? true : false}/>}
                {(showFollowing || showFollowers) && <Friends token={user} users={users} update={() => {window.location.href = `/profile/${user.id}`}}/>}
                {showTags && <Tags userId={user.id}/>}
            </div>
        </Fragment>
    );
}

export default Profile;