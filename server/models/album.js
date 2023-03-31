const getAlbumbById = "SELECT * FROM albums WHERE id = $1";
const createAlbum = "INSERT INTO albums (userid, name, createdat) VALUES ($1, $2, $3) RETURNING id";
const getAlbumByUserId = "SELECT * FROM albums WHERE userid = $1";
const deleteAlbumb = "DELETE FROM albums WHERE id = $1";

module.exports = {
    getAlbumbById,
    createAlbum,
    getAlbumByUserId,
    deleteAlbumb,
}