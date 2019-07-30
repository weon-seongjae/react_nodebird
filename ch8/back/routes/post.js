const express = require('express');
const multer = require('multer');
const db = require('../models');
const path = require('path');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

// ===== multer 설정 =============================
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, `uploads`); // uploads 폴더에 이미지 업로드 done(서버에러, 성공시)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // 확장자를 제외한 파일이름 추출(ex. 가물이.png, ext===.png, basename===가물이
      done(null, basename + new Date().valueOf() + ext); // filename이 같더라도 업로드 시간을 기록해서 overwrite를 방지함.
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 양 * 킬로바이트 * 킬로바이트
});
// =================================================

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post, 별도로 업로드할 이미지가 없을 때 upload.none() 사용
  // multer 역할 : 폼데이터 파일 -> req.file(s), 폼데이터 일반값 -> req.body
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ //findOrCreate : 없으면 만들고 있으면 찾고,
        where: { name: tag.slice(1).toLowerCase() }, // slice는 hashtag의 #를 떼는 것이고, toLowerCase는 영어를 소문자로 통일
      })));
      console.log(result);
      await newPost.addHashtags(result.map(r => r[0])); // post에 hashtag 만든 것들을 연결한다. r은 result의 2차원 배열의 첫번째를 반복해줌.
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2], 배열인지 아닌지 구별해 주어야 함.
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.create({ src: image })
        }));
        await newPost.addImages(images); // 2개 이상의 이미지 : addImages
      } else { // 이미지를 하나만 올리면 image: 주소1
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image); //이미지 주소를 별도로 저정한 후, 게시글과 연결 // 이미지가 1개면 addImage
      }
    }
    // == id로 user 정보를 가져오는 방법====================
    // const User = await newPost.getUser(); // getUser() : sequelize에서 제공해주는 함수
    // newPost.User = User;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    // =================================================
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// postForm.js에서 append하는 이름을 참조해야 함.
// 한 장 올릴 때: upload.single, 여러 장 올릴 때: upload.array 사용, upload.fields: 각각 이름이 다를 때, none: 이미지를 하나도 안 올린 경우
router.post('/images', upload.array(`image`), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if(!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// === 댓글 조회하는 라우터 =====================================================
router.get('/:id/comments', async (req, res, next) => { // 게시글 가져오기
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if(!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [{
        model: db.User,
        attributes: [`id`, `nickname`],
      }],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// == 댓글 작성 로직 ==========================================================================================
router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // ex) POST /api/post/3/comment : 3번 게시글에 댓글달기
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } }); // post가 있는지 먼저 검사
    if(!post) { // 포스트가 없는 경우
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({ // 댓글 생성 : 포스트 번호, 사용자 아이디, 내용 포함해서
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content, // 댓글
    });
    await post.addComment(newComment.id); //포스트와 댓글을 id로 서로 연결해줌.
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: [`id`, `nickname`],
      }],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
// ============================================================================================================

router.post(`/:id/like`, isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }});
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete(`/:id/like`, isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }});
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// == 리트윗 만들기 ====================================================
router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.Post,
        as: 'Retweet',
      }],
    });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
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
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// ===============================================================

module.exports = router;