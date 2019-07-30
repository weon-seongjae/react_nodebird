const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // lt: less than, gte: greater than
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'], // 비밀번호 가져오지 않기
      },{
        model: db.Image,
      },{
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      },{
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        },{
          model: db.Image,
        }],
      }],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순, order가 2차원 배열인 이유는 조건을 여러개 줄 수 있기 때문
      limit: parseInt(req.query.limit, 10),
    });
    res.json(posts); // toJSON은 DB에서 가져온 객체를 가져오는 경우, 변형이 없으면 json으로 가능
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
