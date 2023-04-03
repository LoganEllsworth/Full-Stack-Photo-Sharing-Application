import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Friends from './friends';
import PhotoItem from './photoItem';

function Search({token}) {
    const [showPeople, setShowPeople] = useState(true);
    const [showTags, setShowTags] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const [searchResults, setSearchResults] = useState();
    
    const navigate = useNavigate();
    const { page, autoSearch } = useParams();

    useEffect(() => {
        changeTab(page);
        setSearch(autoSearch);
    }, [])

    function changeTab(tab) {
        navigate(`/search`);
        setSearch('');
        setSearchResults();
        setMessage('');
        switch(tab) {
            case "people":
                setShowPeople(true);
                setShowTags(false);
                setShowComments(false);
                document.getElementById("people").className = "nav-link active";
                document.getElementById("tags").className = "nav-link";
                document.getElementById("comments").className = "nav-link";
                break;
            case "tags":
                setShowPeople(false);
                setShowTags(true);
                setShowComments(false);
                document.getElementById("people").className = "nav-link";
                document.getElementById("tags").className = "nav-link active";
                document.getElementById("comments").className = "nav-link";
                break;
            case "comments":
                setShowPeople(false);
                setShowTags(false);
                setShowComments(true);
                document.getElementById("people").className = "nav-link";
                document.getElementById("tags").className = "nav-link";
                document.getElementById("comments").className = "nav-link active";
                break;
            default:
                setShowTags(false);
                setShowPeople(true);
                setShowComments(false);
        }
    }

    const onSubmitForm = async (e) => {
        setMessage();
        e.preventDefault();
        if (!search) {
            setSearchResults();
            setSuccess(false);
            setMessage("Please enter a search parameter.");
            return;
        }
        try {
            if (showPeople) {
                const body = {
                    origin: token.id,
                    search: search,
                }
                const response = await fetch("http://localhost:5000/api/user/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const results = await response.json();
                setSuccess(results?.success);
                setMessage(results?.message);
                if (results.success) {
                    setSearchResults(results.rows);
                }
            } else if (showTags) {
                try {
                    let tagsArray = search.toUpperCase().split(' ');
                    const body = {
                        "search": tagsArray,
                    }
                    const response = await fetch("http://localhost:5000/api/tags/search", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });
                    const results = await response.json();
                    setSuccess(results?.success);
                    setMessage(results?.message);
                    if (results.success) {
                        setSearchResults(results.rows);
                    }
                } catch (e) {
                    console.error(e.message);
                }
            } else if (showComments) {
                //Call to fetch Comments search results
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <Fragment>
            <div className="w-50 bg-light rounded mx-auto">
                <h1>Search</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" id="people" onClick={() => changeTab("people")}>People</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="tags" onClick={() => changeTab("tags")}>Tags</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="comments" onClick={() => changeTab("comments")}>Comments</a>
                    </li>
                </ul>
                <form className="w-50 bg-light rounded mx-auto" onSubmit={onSubmitForm}>
                    <div className="col">
                        {message && <p className={success ? "alert alert-success mt-2" : "alert alert-danger mt-2"} role="alert">{message}</p>}
                        <div className="row mt-2">
                            <div className="col">
                                <p>Search:</p>
                            </div>
                            <div className="col-10">
                                <input type="text" className="form-control" value={search} onChange={e => setSearch(e.target.value)}></input>
                            </div>
                        </div>
                        <button className="btn btn-success mt-3 mb-3">Search</button>
                    </div>
                </form>
                {showPeople && <Friends token={token} users={searchResults} update={onSubmitForm} />}
                {showTags && <PhotoItem photos={searchResults}/>}
                {showComments && <div>Comment search results...</div>}
            </div>
        </Fragment>
    );
}

export default Search;