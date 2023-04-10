const createTag = "INSERT INTO tags (photoid, name) VALUES ($1, $2) RETURNING id";
const getTrendingTags = "SELECT DISTINCT T.name, COUNT(T.name) FROM tags AS T INNER JOIN tags AS E ON E.name = T.name GROUP BY T.id ORDER BY COUNT(T.name) DESC";
const getTagsByUserId = "SELECT DISTINCT T.name FROM tags AS T LEFT JOIN photos AS P ON T.photoid = P.id LEFT JOIN albums AS A ON P.albumid = A.id LEFT JOIN users AS U ON A.userid = U.id WHERE U.id = $1";
const getTagByPhotoId = "SELECT * FROM tags WHERE photoid = $1";
const getYMAL = "WITH user_tags AS ( " +
    "SELECT DISTINCT t.name " +
    "FROM tags t " +
    "INNER JOIN photos p ON p.id = t.photoid " +
    "INNER JOIN albums a ON a.id = p.albumid " +
    "WHERE a.userid = $1" +
  "), " +
  "matching_photos AS (" +
    "SELECT p.id AS photoid, COUNT(*) AS matched_tags " +
    "FROM photos p " +
    "INNER JOIN tags t ON t.photoid = p.id " +
    "INNER JOIN user_tags ut ON ut.name = t.name " +
    "WHERE NOT EXISTS (" +
      "SELECT 1 " +
      "FROM albums a " +
      "WHERE a.id = p.albumid AND a.userid = $1 " +
    ") " +
    "GROUP BY p.id " +
  ") " +
  "SELECT p.id, p.albumid, p.caption, p.data, COALESCE(mp.matched_tags, 0) AS matched_tags " +
  "FROM photos p " +
  "LEFT JOIN matching_photos mp ON mp.photoid = p.id " +
  "LEFT JOIN albums a ON a.id = p.albumid AND a.userid = $1 " +
  "WHERE a.id IS NULL " +
  "ORDER BY matched_tags DESC, (SELECT COUNT(*) FROM tags WHERE photoid = p.id) ASC, p.id ASC "

module.exports = {
    createTag,
    getTrendingTags,
    getTagsByUserId,
    getTagByPhotoId,
    getYMAL,
}