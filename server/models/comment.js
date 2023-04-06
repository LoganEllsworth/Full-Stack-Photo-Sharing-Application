
const createComment = "INSERT INTO comments (userid, photoid, text, createdat) VALUES ($1, $2, $3, $4) RETURNING id";
const getComments = "SELECT C.*, U.firstname, U.lastname, U.id FROM comments AS C LEFT JOIN users AS U ON U.id = C.userid WHERE C.photoid = $1"
const deleteComment = "DELETE FROM comments WHERE id = $1";

module.exports = {
  createComment,
  getComments,
  deleteComment,
}