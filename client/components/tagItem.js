import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TagItem({ tags }) {
    const [selectedTag, setSelectedTag] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (selectedTag)
            navigate(`/search/tags/${selectedTag.name}`);
    }, [selectedTag])

    return (
        <div className="list-group mt-2">{tags?.map(tag =>
            <li onClick={() => setSelectedTag(tag)} key={tag.id} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="text-container">
                    <div>
                        {tag.name}
                    </div>
                </div>
            </li>
        )}
        </div>
    )
}

export default TagItem;