const pool = require('../db');
const Tag = require('../models/tag');

const AlbumController = require('./albumController');
const UserController = require('./userController');
const CommentsController = require('./commentController');
const LikeController = require('./likeController');

const createTag = async (req, res) => {
    const { photoid, names } = req.body;
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
    const size = search.length;
    pool.query(`
    SELECT DISTINCT P.* FROM photos AS P
    INNER JOIN tags AS T ON T.photoid = P.id
    WHERE UPPER(T.name) = ANY('{${search}}')
    GROUP BY P.id
    HAVING COUNT(DISTINCT T.name) = ${size}`
    , async (error, results) => {
        if (error) throw error;
        let photos = results.rows;
        for (const photo of photos) {
            photo.album = await AlbumController.getAlbum(photo.albumid);
            photo.user = await UserController.getUser(photo.album.userid);
            photo.comments = await CommentsController.getComments(photo.id);
            photo.tags = await getTags(photo.id);
            photo.likes = await LikeController.getLikes(photo.id);
        }
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: photos,
        });
    })
}

const getTrendingTags = async (req, res) => {
    pool.query(Tag.getTrendingTags, (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Trends found.`,
            tags: results.rows,
        });
    });
}

const getTagsByUserId = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Tag.getTagsByUserId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Tags found.`,
            tags: results.rows,
        });
    });
}

const getTags = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(Tag.getTagByPhotoId, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
}

const getYMAL = async (req, res) => {
    let id = parseInt(req.params.id);
    pool.query(Tag.getYMAL, [id], async (error, results) => {
        if (error) throw error;
        let photos = results.rows;
        for (const photo of photos) {
            photo.album = await AlbumController.getAlbum(photo.albumid);
            photo.user = await UserController.getUser(photo.album.userid);
            photo.comments = await CommentsController.getComments(photo.id);
            photo.tags = await getTags(photo.id);
            photo.likes = await LikeController.getLikes(photo.id);
        }
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: photos,
        });
    })
}

module.exports = {
    createTag,
    search,
    getTrendingTags,
    getTagsByUserId,
    getTags,
    getYMAL,
}