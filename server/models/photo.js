const getPhotosByAlbumId = "SELECT * FROM photos WHERE albumid = $1";
const createPhoto = "INSERT INTO photos (albumid, caption, data) VALUES ($1, $2, $3)";

module.exports = {
    getPhotosByAlbumId,
    createPhoto,
}