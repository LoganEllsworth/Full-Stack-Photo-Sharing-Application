const getAlbumbById = "SELECT * FROM albums WHERE id = $1";
const createAlbum = "INSERT INTO albums (userid, name, createdat) VALUES ($1, $2, $3)";
const getAlbumByUserId = "SELECT * FROM albums WHERE userid = $1";

module.exports = {
    getAlbumbById,
    createAlbum,
    getAlbumByUserId,
}