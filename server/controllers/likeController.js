const pool = require('../db');
const Like = require('../models/like');

const createLike = async (req, res) => {
    const { photoid, userid } = req.body;

    pool.query(Like.createLike, [photoid, userid], (error, results) => {
        if (error) throw error;
        res.send({
            success: true,
            message: "Like created.",
        });
    });
}

const deleteLike = async (req, res) => {
    const { photoid, userid } = req.body;

    pool.query(Like.deleteLike, [photoid, userid], (error, results) => {
        if (error) throw error;
        res.send({
            success: true,
            message: "Like deleted.",
        });
    });
}

const getLikesByPhotoId = async (req, res) => {
    let id = parseInt(req.params.id);

    pool.query(Like.getLikesByPhotoId, [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({
                success: true,
                message: "Likes found.",
                likes: results.rows,
            });
        } else {
            res.send({
                success: true,
                message: "No likes.",
                likes: null,
            })
        }
    });
}

const getLikes = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(Like.getLikesByPhotoId, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
}

module.exports = {
    createLike,
    deleteLike,
    getLikesByPhotoId,
    getLikes,
}