const createTag = "INSERT INTO tags (photoid, name) VALUES ($1, $2) RETURNING id";
const getTrendingTags = "SELECT DISTINCT T.name, COUNT(T.name) FROM tags AS T INNER JOIN tags AS E ON E.name = T.name GROUP BY T.id ORDER BY COUNT(T.name) DESC";
const getTagsByUserId = "SELECT DISTINCT T.name FROM tags AS T LEFT JOIN photos AS P ON T.photoid = P.id LEFT JOIN albums AS A ON P.albumid = A.id LEFT JOIN users AS U ON A.userid = U.id WHERE U.id = $1"

module.exports = {
    createTag,
    getTrendingTags,
    getTagsByUserId,
}