const pool = require('../db');
const Friend = require('../models/friend');

const addFriend = async (req, res) => {
    const { origin, destination, createdat } = req.body;

    pool.query(Friend.addFriend, [origin, destination, createdat], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Friend added.`,
            rows: results.rows,
        });
    });
}

const deleteFriend = async (req, res) => {
    const { origin, destination } = req.body;
    pool.query(Friend.deleteFriend, [origin, destination], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Friendship RUINED.`,
            rows: results.rows,
        });
    });
}

const getFriends = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Friend.getFriends, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: results.rows,
        });
    });
}

const getFollowers = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Friend.getFollowers, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: results.rows,
        });
    });
}


module.exports = {
    addFriend,
    deleteFriend,
    getFriends,
    getFollowers
}