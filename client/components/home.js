import React, { Fragment, useState, useEffect } from "react";

import Friends from './friends';
import PhotoItem from './photoItem';

function Home({token}) {
    const [showPosts, setShowPosts] = useState(true);
    const [showFriendRecs, setShowFriendRecs] = useState(false);
    const [showYMAL, setShowYMAL] = useState(false);
    const [newPosts, setNewPosts] = useState();
    const [ymal, setYMAL] = useState();

    useEffect(() => {
        getNewPosts();
    }, [])

    function changeTab(tab) {
        switch(tab) {
            case "posts":
                getNewPosts();
                setShowPosts(true);
                setShowFriendRecs(false);
                setShowYMAL(false);
                document.getElementById("posts").className = "nav-link active";
                document.getElementById("friends").className = "nav-link";
                document.getElementById("ymal").className = "nav-link";
                break;
            case "friends":
                getFriendRecs();
                setShowPosts(false);
                setShowFriendRecs(true);
                setShowYMAL(false);
                document.getElementById("posts").className = "nav-link";
                document.getElementById("friends").className = "nav-link active";
                document.getElementById("ymal").className = "nav-link";
                break;
            case "ymal":
                getYMAL();
                setShowPosts(false);
                setShowFriendRecs(false);
                setShowYMAL(true);
                document.getElementById("posts").className = "nav-link";
                document.getElementById("friends").className = "nav-link";
                document.getElementById("ymal").className = "nav-link active";
                break;
            default:
                setShowFriendRecs(true);
                setShowPosts(false);
                setShowYMAL(false);
        }
    }

    const getNewPosts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/photo/new`);
            const results = await response.json();
            if (results.success) {
                setNewPosts(results?.photos);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const getFriendRecs = async () => {
    }

    const getYMAL = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tags/ymal/${token.id}`);
            const results = await response.json();
            if (results.success) {
                setYMAL(results?.rows);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <Fragment>
            <div className="w-50 bg-light rounded mx-auto">
                <h1>Home</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" id="posts" onClick={() => changeTab("posts")}>Posts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="friends" onClick={() => changeTab("friends")}>Friend Recommendations</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="ymal" onClick={() => changeTab("ymal")}>You May Also Like</a>
                    </li>
                </ul>
                {showPosts && <PhotoItem userId={token.userid} photos={newPosts} pageType={"search"}/>}
                {showFriendRecs && <div>Friend Recs page...</div>}
                {showYMAL && <PhotoItem userId={token.userid} photos={ymal} pageType={"search"}/>}
            </div>
        </Fragment>
    );
}

export default Home;