const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv'); // .env 설정
const passport = require('passport');

const passportConfig = require('./passport'); // 패스포트 정의 불러옴
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

dotenv.config(); // .env 실행
const app = express();
db.sequelize.sync();
passportConfig(); // 패스포트 정의

app.use(morgan('dev'));
app.use('/', express.static('uploads')); // static이라는 middleware로 경로를 지정해주면 다른 서버에서 그 경로에 있는 데이터를 마음대로 가져갈 수 있다.
// == '/'의 의미 : uploads 폴더를 root 폴더와 같이 사용하게 해 주겠다는 뜻. /는 프론트에서 접근하는 주소, static에 있는 주소는 실제 서버의 주소
// == sagas/user.js에서 withCredentials:true에 대응하는 개념==============
app.use(cors({
  origin: true, // 요청주소와 동일하게
  credentials: true, // axios에서도 처리
}));
// ===================================================================
// ========== saga에서 보내준 데이터를 해석하는 곳 =========================
app.use(express.json()); //json 형식의 데이터 처리
app.use(express.urlencoded({ extended: true })); //form 형식의 데이터 처리
// ====================================================================

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // 매번 세션 강제저장
  saveUninitialized: false, // 빈 값도 저장
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'rnbck',
}));
// ====passport 세션은 express 세션을 사용하므로, express 세션을 선언한 후에 사용해야 함.
app.use(passport.initialize());
app.use(passport.session());
// ============================================================================

app.get('/', (req, res) => {
  res.send('react nodebird 백엔드 정상동작');
});

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

app.listen(process.env.NODE.ENV === 'producetion' ? process.env.PORT : 3065, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
