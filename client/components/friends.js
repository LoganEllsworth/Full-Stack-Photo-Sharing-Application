import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Friends({token, users, update}) {
    
    const [selectedUser, setSelectedUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUser)
            navigate(`/profile/${selectedUser.id}`);
    }, [selectedUser])

    const addFriend = async (userId) => {
        try {
            const body = {
                origin: token.id,
                destination: userId,
                createdat: new Date().toLocaleString(),
            }
            const response = await fetch("http://localhost:5000/api/friend/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (e) {
            console.error(e.message);
        }
    }
    
    const removeFriend = async (userId) => {
        try {
            const body = {
                origin: token.id,
                destination: userId,
            }
            const response = await fetch("http://localhost:5000/api/friend/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    return (<div className="list-group mt-2">{users?.map(user =>
        <li onClick={() => setSelectedUser(user)} key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.firstname + " " + user.lastname + " (" + (user.mutual_friends ? user.mutual_friends : 0) + " Mutual Friend(s))"}
            {!user.friends && <button className="badge badge-primary badge-pill" id={user.id} onClick={async (e) => { await addFriend(user.id); update(e); }}>Add Friend</button>}
            {user.friends && <button className="badge badge-pill" id={user.id} onClick={async (e) => { await removeFriend(user.id); update(e); }}>Remove Friend</button>}
        </li>)}</div>);
};

export default Friends;