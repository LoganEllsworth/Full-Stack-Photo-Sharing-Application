const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const createUser = "INSERT INTO users (firstname, lastname, email, dob, hometown, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
}