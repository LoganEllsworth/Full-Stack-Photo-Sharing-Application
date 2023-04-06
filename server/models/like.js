const createLike = "INSERT INTO likes (photoid, userid) VALUES ($1, $2)";
const deleteLike = "DELETE FROM likes WHERE photoid = $1 AND userid = $2";
const getLikesByPhotoId = "SELECT * FROM likes WHERE photoid = $1";

module.exports = {
    createLike,
    deleteLike,
    getLikesByPhotoId,
}