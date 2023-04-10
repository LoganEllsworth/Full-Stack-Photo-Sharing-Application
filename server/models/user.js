const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const createUser = "INSERT INTO users (firstname, lastname, email, dob, hometown, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
const getLeaderboard = "SELECT U.*, (SELECT COUNT(*) FROM comments AS C WHERE C.userid = U.id) + (SELECT COUNT(*) FROM photos AS P LEFT JOIN albums AS A ON A.id = P.albumid WHERE A.userid = U.id) AS score FROM users AS U ORDER BY score DESC LIMIT 10";

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    getLeaderboard,
}