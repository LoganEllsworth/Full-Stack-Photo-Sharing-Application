const pool = require('../db');
const Tag = require('../models/tag');

const AlbumController = require('./albumController');
const UserController = require('./userController');

const createTag = async (req, res) => {
    const { photoid, names } = req.body;
    console.log(names);
    names.forEach(name => {
        pool.query(Tag.createTag, [photoid, name], (error, results) => {
            if (error) throw error;
        });
    });
    res.status(200).send({
        success: true,
        message: `Tag(s) created.`,
    });
}

const search = async (req, res) => {
    const { search } = req.body;
    pool.query(`
    SELECT DISTINCT P.* FROM photos AS P
    LEFT JOIN tags AS T ON T.photoid = P.id
    WHERE UPPER(T.name) = ANY('{${search}}')`
    , async (error, results) => {
        if (error) throw error;
        let photos = results.rows;
        for (const photo of photos) {
            photo.album = await AlbumController.getAlbum(photo.albumid);
            photo.user = await UserController.getUser(photo.album.userid);
            //Comments
            //Tags
            //Likes
        }
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: photos,
        });
    })
    // pool.query(`
    // SELECT DISTINCT P.*, U.* FROM photos AS P 
    // LEFT JOIN tags AS T ON T.photoid = P.id
    // LEFT JOIN albums AS A ON P.albumid = A.id
    // LEFT JOIN users AS U ON A.userid = U.id
    // WHERE UPPER(T.name) = ANY('{${search}}')`
    // , (error, results) => {
    //     if (error) throw error;
    //     res.status(200).send({
    //         success: true,
    //         message: `Search successful.`,
    //         rows: results.rows,
    //     });
    // })
}

module.exports = {
    createTag,
    search,
}