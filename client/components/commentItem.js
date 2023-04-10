import React from "react";
import './styles/commentItem.css';

function CommentItems({comments, pageType}) {

  const deleteComment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/comment/delete/${id}`);
      window.location.href = "/profile";
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="list-group mt-2">{comments?.map(comment =>
      <li key={comment.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="text-container">
          <div className="name-date">
            <p>{comment.firstname + " " + comment.lastname}</p>
            <p>{new Date(comment.createdat).toLocaleDateString()}</p>
          </div>
          <div className="sent-comment">
            <p>{comment.text}</p>
            {pageType !== 'search' && <button onClick={() => { deleteComment(comment.id) }} className="delete-comment">Delete</button>}
          </div>
        </div>

      </li>
    )}
    </div>
  )

}

export default CommentItems;