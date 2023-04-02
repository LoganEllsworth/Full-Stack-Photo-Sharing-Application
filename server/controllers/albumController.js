const pool = require('../db');
const Album = require('../models/album');

const createAlbum = async (req, res) => {
    const { userid, name, createdat } = req.body;
    pool.query(Album.createAlbum, [userid, name, createdat], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({ 
                success: true,
                message: "Album created.",
            });
        }
    });
}

const getAlbumByUserId = async (req, res) => {
    let id = parseInt(req.params.id);

    pool.query(Album.getAlbumByUserId, [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({ 
                success: true,
                message: "Albums found.",
                albums: results.rows,
            });
        }
    });
}

const deleteAlbum = async (req, res) => {
    let id = parseInt(req.params.id);

    pool.query(Album.deleteAlbum, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Albumb deleted.`,
        });
    });
}

const getAlbum = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(Album.getAlbumById, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows[0]);
            }
        });
    });
}

module.exports = {
    createAlbum,
    getAlbumByUserId,
    deleteAlbum,
    getAlbum
}