const pool = require('../db');
const Tag = require('../models/tag');

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

module.exports = {
    createTag,
}