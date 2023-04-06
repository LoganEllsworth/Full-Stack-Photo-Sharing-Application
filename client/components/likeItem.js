import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LikeItem({ likes }) {
    const [selectedUser, setSelectedUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUser)
            navigate(`/search/people/${selectedUser.firstname} ${selectedUser.lastname}`);
    }, [selectedUser])

    return (
        <div className="list-group mt-2">{likes?.map(like =>
            <li onClick={() => setSelectedUser(like)} key={like.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="text-container">
                    <div>
                        {like.firstname + " " + like.lastname}
                    </div>
                </div>
            </li>
        )}
        </div>
    )
}

export default LikeItem;