import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI(postData) {
  return axios.post('/post', postData, { // postData에 게시글 들어있음
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({ // user reducer의 데이터를 수정
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    });
  }
}

// ===================================================================================
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadMainPostsAPI(lastId = 0, limit = 10) {
  return axios.get(`/posts?lastId=${lastId}&limit=${limit}`); // 서버에 요청
  // withCredentials : true는 붙이지 않아도 됨. 로그인하지 않는 사람도 게시글은 볼 수 있음.
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadMainPosts() {
  yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts); // throttle 연달아 호출되는 것을 막아주는 기능
}
// ===================================================================================

function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`); // 서버에 요청
  // withCredentials : true는 붙이지 않아도 됨. 로그인하지 않는 사람도 게시글은 볼 수 있음.
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
// ==========================================================================================

function loadUserPostsAPI(id) {
  return axios.get(`/user/${id || 0}/posts`); // 서버에 요청
  // withCredentials : true는 붙이지 않아도 됨. 로그인하지 않는 사람도 게시글은 볼 수 있음.
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
// ==========================================================================================

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) { // action : request에 대한 action
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId, // action 안에 들어있는 data.postId
        comment: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment); // 위의 function* addComment에 대한 action
}

// ==========================게시글 불러오기 ====================================================

function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) { // action : request에 대한 action
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments); // 위의 function* addComment에 대한 action
}

// =======================================================================

function uploadImagesAPI(formData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/post/images', formData, {
    withCredentials: true, // 로그인한 사용자만 이미지 올릴 수 있음.
  });
}

function* uploadImages(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(uploadImagesAPI);
    const result = yield call(uploadImagesAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data, // result.data: 서버쪽에서 저정된 이미지 주소
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

// =======================================================================

function likePostAPI(postId) {
  // 서버에 요청을 보내는 부분
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true, // 로그인한 사용자만 이미지 올릴 수 있음.
  });
}

function* likePost(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(likePostAPI);
    const result = yield call(likePostAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// =======================================================================

function unlikePostAPI(postId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true, // 로그인한 사용자만 이미지 올릴 수 있음.
  });
}

function* unlikePost(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(unlikePostAPI);
    const result = yield call(unlikePostAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

// =======================================================================

function retweetAPI(postId) {
  // 서버에 요청을 보내는 부분
  return axios.post(`/post/${postId}/retweet`, {}, { // post로 요청할 때는 data가 없더라도 빈 객체라도 넣어주어야 함.
    withCredentials: true, // 로그인한 사용자만 이미지 올릴 수 있음.
  });
}

function* retweet(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(retweetAPI);
    const result = yield call(retweetAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    });
    alert(e.response && e.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

// =======================================================================

function removePostAPI(postId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/post/${postId}`, { // post로 요청할 때는 data가 없더라도 빈 객체라도 넣어주어야 함.
    withCredentials: true, // 로그인한 사용자만 이미지 올릴 수 있음.
  });
}

function* removePost(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(removePostAPI);
    const result = yield call(removePostAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// =======================================================================

function loadPostAPI(postId) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/post/${postId}`);
}

function* loadPost(action) { // 남의 정보도 불러올 수 있게 수정을 해줘야 함.
  try {
    // yield call(loadPostAPI);
    const result = yield call(loadPostAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
