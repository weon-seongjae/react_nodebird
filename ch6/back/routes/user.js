const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => { // /api/user/
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await db.User.create({
      nickname: req.body.nickname, // index.js에서 해석된 부분이 들어가는 곳
      userId: req.body.userId,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser); //send: 문자열 전송, json: json 데이터 전송
  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/123
  try {
    const user = await db.User.findOne({
      where: { id: parseInt( req.params.id, 10 ) },
      include: [{
        model: db.Post,
        as: 'Posts',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followers',
        attributes: ['id'],
      }],
      attribute: [`id`, `nickname`], //남의 아이디와 닉네임을 찾아서 전송
    });
    // ==== 서버에서 프론트로 내려가는 정보가 과연 내려보내도 되는 정보인지 확인===============
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  // ==============================================================================
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', (req, res) => { // /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
  passport.authenticate('local', (err, user, info) => { //local.js에서 (서버, 성공여부, 로직)에 대한 인자
    if (err) { // 서버 에러인 경우
      console.error(err);
      return next(err);
    }
    if (info) { // 로직상의 에러인 경우
      return res.status(401).send(info.reason); // local.js의 비밀번호가 틀립니다.
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [{
            model: db.Post,
            as: 'Posts', // models/user.js의 db.User hanMany(db.Post)의 as
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
          }],
          attributes: ['id', 'nickname', 'userId'], //보안상 password는 프론트에 보내지 않는다.
        });
        console.log(fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.get('/:id/follow', (req, res) => { // /api/user/:id/follow //:id(와일드카드) /api/user/12541 (동적으로 변하는 데이터들) id에 넣어줌

});

router.get('/hashtag/:name'); // 동적으로 넣어주는 name은 next에서는 불가능하고 express를 사용해야 함. 프론트서버에도 next와 express도 연결해야 함.

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt( req.params.id,10 ),
        RetweetId: null,
      },
      include: [{
        model: db.User, //게시글 작성자
        attributes: [`id`, `nickname`],
      },{
        model: db.Image, // 이미지도 같이 불러옴
      },{
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }

});

module.exports = router;
