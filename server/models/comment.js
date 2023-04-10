
const createComment = "INSERT INTO comments (userid, photoid, text, createdat) VALUES ($1, $2, $3, $4) RETURNING id";
const getComments = "SELECT C.*, U.firstname, U.lastname, U.id AS userid FROM comments AS C LEFT JOIN users AS U ON U.id = C.userid WHERE C.photoid = $1";
const deleteComment = "DELETE FROM comments WHERE id = $1";
const searchComments = "SELECT U.firstname, U.lastname, COUNT(C.*) FROM users AS U LEFT JOIN comments AS C ON C.userid = U.id WHERE C.text = $1 GROUP BY U.id ORDER BY COUNT(C.*) DESC";

module.exports = {
  createComment,
  getComments,
  deleteComment,
  searchComments,
}