
const pool = require('../db');
const comments = require('../models/comment');


const createComment = async (req, res) => {
    const { userid, photoid, text, createdAt } = req.body;
    //console.log(userid + " " + photoid + " " + text+ " " + createdat);
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
    return new Promise((resolve, reject) => {
        pool.query(comments.getComments, [id], (error, results) => {
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
    deleteComment,
    getComments,
}