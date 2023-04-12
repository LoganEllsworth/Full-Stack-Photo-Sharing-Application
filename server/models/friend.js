const addFriend = "INSERT INTO user_friend (origin, destination, createdat) VALUES ($1, $2, $3)";
const deleteFriend = "DELETE FROM user_friend WHERE origin = $1 AND destination = $2";
const getFriends = "SELECT U.id, U.firstname, U.lastname, CASE WHEN F.destination IS NULL THEN FALSE ELSE TRUE END AS friends FROM users AS U LEFT JOIN user_friend AS F ON U.id = F.destination WHERE F.origin = $1";
const getFollowers = "SELECT U.id, U.firstname, U.lastname, CASE WHEN EXISTS (SELECT * FROM user_friend AS UF WHERE UF.origin = $1 AND UF.destination = U.id) THEN TRUE ELSE FALSE END AS friends FROM users AS U LEFT JOIN user_friend AS F ON U.id = F.origin WHERE F.destination = $1";
const getMutuals = "SELECT u.id, u.firstname, u.lastname, COUNT(*) AS mutual_friends FROM users u JOIN user_friend uf1 ON u.id = uf1.destination JOIN user_friend uf2 ON uf1.origin = uf2.destination AND uf2.origin = $1 WHERE u.id NOT IN (SELECT destination FROM user_friend WHERE origin = $1) AND u.id != $1 GROUP BY u.id, u.firstname, u.lastname ORDER BY mutual_friends DESC";

module.exports = {
    addFriend,
    deleteFriend,
    getFriends,
    getFollowers,
    getMutuals,
}