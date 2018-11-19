const express = require('express');
const bcrypt = require('bcrypt');
const { Member } = require('../models');
const { createToken } = require('../lib/token');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', isAuthenticated, async (req, res, next)=>{
    const id = req.params.id;
    try {
      const member = await Member.find(
        {
          attributes: ['id', 'nickname', 'email', 'photo', 'regDate'],
          where: {id}
        }
      )
      return res.status(200).json(member);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false, message: error
      });
    }
});

router.post('/join', async (req, res, next) => {
    const { id, nickname, password, email, picture, birth } = req.body;
    try {
      console.log(req.body);
      const member = await Member.find({ where: { id } });
      if (member) {
        return res.status(400).json({
          success: false, message: '이미 가입된 아이디입니다.'
        });
      }
      const hash = await bcrypt.hash(password, 12);
      await Member.create({
        id, nickname, password: hash, picture, email, birth
      });
      return res.status(200).json({
        success: true, message: '가입성공'
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false, message: error
      });
    }
});

router.post('/login', async (req, res, next) => {
    try {
      const { id, password } = req.body;
      const member = await Member.find({ where: { id } });
      if (member) {
        const result = await bcrypt.compare(password, member.password);
        if (result) {
          // 로그인 성공
          const token = await createToken({
            id : member.id,
            nickname: member.nickname
          });
          res.status(200).json({
            success: false, message: '로그인 성공', token
          });
        } else {
          return res.status(400).json({
            success: false, message: '비밀번호가 일치하지 않습니다.'
          });
        }
      } else {
        return res.status(400).json({
          success: false, message: '존재하는 계정이 없습니다.'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false, message: error
      });
    }
  });

  module.exports = router;