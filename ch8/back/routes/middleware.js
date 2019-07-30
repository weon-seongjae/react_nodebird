exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // e를 넣으면 error처리로 넘어가고, e를 넣지 않으면 다음 middleware로 넘어감
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

// 로그인 여부를 판단하는 미들웨어

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // e를 넣으면 error처리로 넘어가고, e를 넣지 않으면 다음 middleware로 넘어감
  } else {
    res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
  }
};

// 로그인 한 경우 볼 필요가 없는 부분을 나탸내는 경우