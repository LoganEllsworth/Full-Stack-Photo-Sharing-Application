const createLike = "INSERT INTO likes (photoid, userid) VALUES ($1, $2)";
const deleteLike = "DELETE FROM likes WHERE photoid = $1 AND userid = $2";
const getLikesByPhotoId = "SELECT L.*, U.firstname, U.lastname, U.id AS userid FROM likes AS L LEFT JOIN users AS U ON U.id = L.userid WHERE photoid = $1";

module.exports = {
    createLike,
    deleteLike,
    getLikesByPhotoId,
}