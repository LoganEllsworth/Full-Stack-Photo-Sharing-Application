import React, {Fragment, useState} from "react";
import './styles/commentItem.css';

function CommentItems({comments, pageType}) {

  //console.log(comments)

  const deleteComment = async (id) => {
    //console.log(id)
    try {
      const response = await fetch(`http://localhost:5000/api/comment/delete/${id}`);
      const results = await response.json();
      window.location.href = "/profile";
    } catch (e) {
      console.error(e.message);
    }

  }


  return (
    
    <div className="list-group mt-2">{comments?.map(comment =>
      <li key={comment.id} className="list-group-item list-group-item-action flex-column align-items-start">
          {console.log(comment.id)}
        <div className="text-container">
          <div className="name-date">
            <p>{comment.firstname + " " + comment.lastname}</p>
            <p>{new Date(comment.createdat).toLocaleDateString()}</p>
          </div>
          <div className="sent-comment">
            
            <p>{comment.text}</p>
            {pageType !== 'search' && <button onClick={() => {deleteComment(comment.id)}} className="delete-comment">Delete</button>}
            
          </div>
        </div>

      </li>
    )}
    </div>
)

}

export default CommentItems;