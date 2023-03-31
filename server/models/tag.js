const createTag = "INSERT INTO tags (photoid, name) VALUES ($1, $2) RETURNING id";

module.exports = {
    createTag,
}