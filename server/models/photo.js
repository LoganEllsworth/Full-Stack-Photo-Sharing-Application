const getPhotosByAlbumId = "SELECT * FROM photos WHERE albumid = $1 ORDER BY id DESC";
const createPhoto = "INSERT INTO photos (albumid, caption, data) VALUES ($1, $2, $3) RETURNING id";
const deletePhoto = "DELETE FROM photos WHERE id = $1"

module.exports = {
    getPhotosByAlbumId,
    createPhoto,
    deletePhoto,
}