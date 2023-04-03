const createTag = "INSERT INTO tags (photoid, name) VALUES ($1, $2) RETURNING id";
const getTrendingTags = "SELECT DISTINCT T.name, COUNT(T.name) FROM tags AS T INNER JOIN tags AS E ON E.name = T.name GROUP BY T.id ORDER BY COUNT(T.name) DESC";

module.exports = {
    createTag,
    getTrendingTags,
}