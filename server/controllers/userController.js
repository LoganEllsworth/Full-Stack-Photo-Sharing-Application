const pool = require('../db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const getUserById = (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(User.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `User found.`,
            user: results.rows[0],
        });
    })
};

const createUser = async (req, res) => {
    const { firstname, lastname, email, dob, hometown, gender, password } = req.body;

    const hashedPassword = await hashPassword(password);

    pool.query(User.getUserByEmail, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({ 
                success: false,
                message: "This email is already registered. Please login."
            });
            return;
        }

        pool.query(User.createUser, [firstname, lastname, email, dob, hometown, gender, hashedPassword], (error, results) => {
            if (error) throw error;
            pool.query(User.getUserByEmail, [email], (error, results) => {
                if (error) throw error;
                res.send({ 
                    success: true,
                    message: "Success! Logging in...",
                    user: results.rows[0],
                });
            });
        });
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    pool.query(User.getUserByEmail, [email], async (error, results) => {
        if (error) throw error;
        if (!results.rows.length || results.rows.length > 1) {
            res.send({
                success: false,
                message: "No accounts found with that email."
            });
            return;
        }
        const validPassword = await checkPassword(password, results.rows[0].password);

        if (!validPassword) {
            res.send({
                success: false,
                message: "Invalid password."
            });
            return;
        }
        res.status(201).send({
            success: true,
            message: `Login successful.`,
            user: results.rows[0],
        });
    });
}

const search = async (req, res) => {
    const { origin, search } = req.body;
    pool.query(`
    SELECT U.id, U.firstname, U.lastname,
    CASE WHEN F.destination IS NULL THEN FALSE ELSE TRUE END AS friends
    FROM users AS U
    LEFT JOIN user_friend AS F ON (U.id = F.destination AND F.origin = ${origin})
    WHERE (firstname ILIKE '%${search}%' OR lastname ILIKE '%${search}%' OR email ILIKE '%${search}%' OR (firstname ||' '|| lastname) ILIKE '%${search}%') AND U.id != ${origin}`
    , (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: results.rows,
        });
    })
}

function hashPassword(cleartextPassword) {
    return new Promise((fulfill, reject) => {
        bcrypt.hash(cleartextPassword, SALT_ROUNDS, (error, hash) => {
            if (error)
                reject(error);
            else
                fulfill(hash);
        });
    });
}

function checkPassword(cleartextPassword, hash) {
    return new Promise((fullfill, reject) => {
        bcrypt.compare(cleartextPassword, hash, (error, res) => {
            if (error)
                reject(error);
            else
                fullfill(res);
        });
    });
}

const getUser = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(User.getUserById, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows[0]);
            }
        });
    });
}

const getLeaderboard = async (req, res) => {
    pool.query(User.getLeaderboard, (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Leaderboard updated.`,
            rows: results.rows,
        });
    })
}

module.exports = {
    getUserById,
    createUser,
    login,
    search,
    getUser,
    getLeaderboard,
}