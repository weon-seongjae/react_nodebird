import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  EDIT_NICKNAME_FAILURE, EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
} from '../reducers/user';

// call은 동기 호출(순서를 지켜서 실행하는 경우), fork는 비동기 호출
// call은 서버에 요청한 후 응답이 다 받아질 때까지 기다림
// fork는 서버에 요청한 후 응답유무에 관계없이 실행

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials: true, // 프론트와 서버간에 쿠키를 주고받을 수 있음
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // yield fork(logger); //logger는 내 기록을 로깅하는 함수, 10초 걸림
    // yield call(loginAPI);
    yield put({ // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    // yield fork(logger); //logger는 내 기록을 로깅하는 함수, 10초 걸림
    yield call(signUpAPI, action.data);
    yield put({ // put은 dispatch와 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() { // 로그아웃 할 때는 데이터가 필요없다.
  // 서버에 요청을 보내는 부분
  return axios.post('/user/logout', {}, { // (주소, 데이터 , 설정) 두번째 인자는 데이터인데 빈 값이라도 넣어야 한다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* logOut() {
  try {
    // yield call(logOutAPI);
    yield call(logOutAPI);
    yield put({ // put은 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI(userId = 0) {
  // 서버에 요청을 보내는 부분
  return axios.get(userId ? `/user/${userId}` : '/user/', { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* loadUser(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(loadUserAPI);
    const result = yield call(loadUserAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data, // action.data = userId(남의 정보)가 없는 경우 내 정보 불러옴
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function followAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.post(`/user/${userId}/follow`, {}, { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* follow(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(followAPI);
    const result = yield call(followAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

// =====================================================
function unfollowAPI(userId = 0) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follow`, { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* unfollow(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(unfollowAPI);
    const result = yield call(unfollowAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

// =====================================================
function loadFollowersAPI(userId, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* loadFollowers(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({ // put은 dispatch 동일
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

// =====================================================
function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* loadFollowings(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({ // put은 dispatch 동일
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follower`, { // get은 데이터가 없기 때문에 두번째가 바로 설정이 된다.
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* removeFollower(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(removeFollowersAPI);
    const result = yield call(removeFollowerAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

// =====================================================
function editNicknameAPI(nickname) {
  // 서버에 요청을 보내는 부분
  return axios.patch('/user/nickname', { nickname }, { // 부분수정은 patch를 사용한다. 전체 수정은 put
    withCredentials: true, // 서버의 app.use(cors)에서 쿠키를 받는다.
  });
}

function* editNickname(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(editNicknamesAPI);
    const result = yield call(editNicknameAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}


export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
