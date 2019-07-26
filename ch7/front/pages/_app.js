import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga'; // 서버사이드 렌더링에 필수요소
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import Home from './index';
import { LOAD_USER_REQUEST } from '../reducers/user';

const NodeBird = ({ Component, store, pageProps }) => ( // hashtag의 component의 props로 넣어줌.
  <Provider store={store}>
    <Head>
      <title>NodeBird</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Head>
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  </Provider>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// const middleware = (store) => (next) => (action) => {
//   next(action);
// };
//= =====middleware만드는 방법 : currying - 인자 하나를 받아 다른 함수를 리턴

// ==================next에서 getInitialProps 실행. context도 같이 넣어줌. 이것에 각 Component에서 실행됨.===============
NodeBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState(); // user 정보 가져옴, user 정보도 서버사이드 렌더링 구현됨
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; // 쿠키가 위치하는 곳
  console.log(cookie); // 클라이언트 환경에서는 브라우저가 쿠키를 넣어주는데, 서버일 경우에는 직접 넣어야 한다.
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer) {
    axios.defaults.headers.Cookie = cookie; // 직접 쿠키를 넣어줌.
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx); // hashtag.js에서 리턴한 값이 pageProps에 담김. pageProps는 위의 NodeBird의 pageProps로 넘김, index.js의 Home.getInitialProps = async (context)가 됨. 게시글 먼저 가져오는 경우
  }
  return { pageProps }; // component의 props
};
// =================================================================================

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, store => next => (action) => {
    console.log(action);
    next(action);
  }];
  const enhancer = process.env.NODE_ENV === 'production' // 실제 서비스
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // 서버사이드 렌더링할 때 store.sagaTask를 변수로 설정. withReduxSaga가 내부에서 필요로 함
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));

// 레이아웃은 _app.js에서 코딩을 한다.
