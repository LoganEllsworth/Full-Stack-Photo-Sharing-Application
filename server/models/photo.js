const getPhotosByAlbumId = "SELECT * FROM photos AS P LEFT JOIN albums AS A ON P.albumid = A.id LEFT JOIN users AS U ON A.userid = U.id WHERE P.albumid = $1 ORDER BY P.id DESC";
const createPhoto = "INSERT INTO photos (albumid, caption, data) VALUES ($1, $2, $3) RETURNING id";
const deletePhoto = "DELETE FROM photos WHERE id = $1"

module.exports = {
    getPhotosByAlbumId,
    createPhoto,
    deletePhoto,
}