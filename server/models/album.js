const getAlbumById = "SELECT * FROM albums WHERE id = $1";
const createAlbum = "INSERT INTO albums (userid, name, createdat) VALUES ($1, $2, $3) RETURNING id";
const getAlbumByUserId = "SELECT * FROM albums WHERE userid = $1";
const deleteAlbum = "DELETE FROM albums WHERE id = $1";

module.exports = {
    getAlbumById,
    createAlbum,
    getAlbumByUserId,
    deleteAlbum,
}