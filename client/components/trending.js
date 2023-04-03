import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Trending() {
    const [selectedTag, setSelectedTag] = useState();
    const [trendingTags, setTrendingTags] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getTrendingTags();
    }, [])

    useEffect(() => {
        if (selectedTag)
            navigate(`/search/tags/${selectedTag.name}`);
    }, [selectedTag])

    const getTrendingTags = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tags/trending`);
            const results = await response.json();
            setTrendingTags(results?.tags);
            return results?.tags;
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <Fragment>
            <div className="w-50 bg-light rounded mx-auto">
                <h1>Trending Tags</h1>
                {trendingTags && <div className="list-group mt-2">{trendingTags?.map(tag =>
                    <li onClick={() => setSelectedTag(tag)} key={tag.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {tag.name}
                        {<span className="badge badge-pill">{tag.count}</span >}
                    </li>)}
                </div>}
            </div>
        </Fragment>
    );
}

export default Trending;