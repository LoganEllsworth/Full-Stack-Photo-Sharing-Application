const pool = require('../db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const getUser = (req, res) => {
    pool.query(User.getUser, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(User.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const createUser = async (req, res) => {
    const { firstname, lastname, email, dob, hometown, gender, password } = req.body;

    const hashedPassword = await hashPassword(password);

    pool.query(User.getUserByEmail, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({ message: "This email is already registered."});
            return;
        }

        pool.query(User.createUser, [firstname, lastname, email, dob, hometown, gender, hashedPassword], (error, results) => {
            if (error) throw error;
            res.status(201).send({message: "User created."});
            console.log("User created.");
        });
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    pool.query(User.getUserByEmail, [email], async (error, results) => {
        if (error) throw error;
        if (!results.rows.length || results.rows.length > 1) {
            res.send({message: "No user found."});
            return;
        }
        const validPassword = await checkPassword(password, results.rows[0].password);
        console.log(validPassword);

        if (!validPassword) {
            res.send({message: "Invalid password."})
            return;
        }

        res.status(201).send({message: `Login successful for ${email}`});
    });
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

module.exports = {
    getUser,
    getUserById,
    createUser,
    login,
}