const pool = require('../db');
const Photo = require('../models/photo');

const getPhotosByAlbumId = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Photo.getPhotosByAlbumId, [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({ 
                success: true,
                message: "Photos found.",
                photos: results.rows,
            });
        } else {
            res.send({
                success: true,
                message: "Empty album.",
                photos: null,
            })
        }
    });
}

const createPhoto = async (req, res) => {
    const { albumid, caption, data } = req.body;
    pool.query(Photo.createPhoto, [albumid, caption, data], (error, results) => {
        if (error) throw error;
        if (results.rowCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.send({ 
                success: true,
                message: "Photo created.",
                id: results.rows[0].id,
            });
        }
    });
}

const deletePhoto = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Photo.deletePhoto, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Photo deleted.`,
        });
    });
}

module.exports = {
    getPhotosByAlbumId,
    createPhoto,
    deletePhoto,
}