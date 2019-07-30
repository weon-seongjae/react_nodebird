const express = require('express');
const db = require('../models');

const router = express.Router();

router.get(`/:tag`, async (req, res, next) => { // tag는 한글, 영어, 숫자 등이 들어올 수 있음.
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.Hashtag, // Posts에 대한 조건이 아니라 hashtag에 대한 조건을 찾는 경우에는 아래에 where 조건을 적는다.
        where: { name: decodeURIComponent(req.params.tag) }, // 정상적으로 한글이 출력되도록 decodeURIComponent로 감싸줌.
      }, {
        model: db.User, // 게시글 작성자
        attributes: [`id`, `nickname`],
      }, {
        model: db.Image,
      }, {
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
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10),
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;