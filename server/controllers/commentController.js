
const pool = require('../db');
const comments = require('../models/comment');


const createComment = async (req, res) => {
    const { userid, photoid, text, createdAt } = req.body;
    //console.log(userid + " " + photoid + " " + text + " " + createdAt);
    pool.query(comments.createComment, [userid, photoid, text, createdAt], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send({
                success: true,
                message: "Comment created.",
            });
        }
    });
}

const search = async (req, res) => {
    const { search } = req.body;
    console.log(search);

    pool.query(comments.searchComments, [search], (error, results) => {
        if (error) throw error;
        
        res.status(200).send({
            success: true,
            message: `Search successful.`,
            rows: results.rows,
        });
    })
}

const deleteComment = async (req, res) => {
    let id = parseInt(req.params.id);

    pool.query(comments.deleteComment, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send({
            success: true,
            message: `Comment deleted.`,
        });
    });
}

const getComments = (id) => {
    console.log("getComments " + id);
    return new Promise((resolve, reject) => {
        pool.query(comments.getComments, [id], (error, results) => {
            //console.log(results.rows);
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
}

module.exports = {
    createComment,
    search,
    deleteComment,
    getComments,
}