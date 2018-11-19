const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

router.post('/reg', async(req, res, next)=>{
    try {
        const { content, writer, boardId } = req.body;
        const result = await Comment.create({
            content, writer, boardId
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.delete('/delete/:id', async(req, res, next)=>{
    try {
        const id = req.params.id
        const result = await Comment.destroy({
            where: { id }
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.put('/update', async(req, res, next)=>{
    try {
        const { content, id } = req.body;
        const result = await Comment.update(
            {content},
            {where: {id}}
        )
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
})

module.exports = router;