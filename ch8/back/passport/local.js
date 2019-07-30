const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({ // 패스포트 전략
    usernameField: 'userId', // 프론트의 req.body에 넣어준 값
    passwordField: 'password',
  }, async (userId, password, done) => { // req.body의 id와 password를 집어넣음
    try {
      const user = await db.User.findOne({ where: { userId } });
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다!' }); // (서버, 성공여부, 로직)
      }
      const result = await bcrypt.compare(password, user.password); // (프론트에서 보낸 암호, db에 저장된 암호)
      if (result) {
        return done(null, user); // 성공 시
      }
      return done(null, false, { reason: '비밀번호가 틀립니다.' });
    } catch (e) {
      console.error(e);
      return done(e);
    }
  }));
};
