const express = require('express');
const { Member, Board, Comment } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id',  async (req, res, next)=>{
    try {
        const id = req.params.id
        const board = await Board.find({
            where: { id }
        });
        res.json(board);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.get('/list', async (req, res, next)=>{
    try {
        const boardList = await Board.findAll(
            {order: [['regDate', 'DESC']]}
        );
        res.json(boardList);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.post('/reg', isAuthenticated , async(req, res, next)=>{
    try {
        const { title, content, writer } = req.body;
        const result = await Board.create({
            title, content, writer
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.delete('/delete/:id', isAuthenticated, async(req, res, next)=>{
    try {
        const id = req.params.id
        const result = await Board.destroy({
            where: { id }
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
});

router.put('/update', isAuthenticated, async(req, res, next)=>{
    try {
        const { title, content, id } = req.body;
        const result = await Board.update(
            {content, title},
            {where: {id}}
        )
        res.json(result);
    } catch (error) {
        console.error(error);
        next();
    }
})

module.exports = router;