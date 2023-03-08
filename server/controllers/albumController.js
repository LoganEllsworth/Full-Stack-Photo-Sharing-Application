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

module.exports = {
    createAlbum,
    getAlbumByUserId,
}