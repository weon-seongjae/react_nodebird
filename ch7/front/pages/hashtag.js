import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {LOAD_HASHTAG_POSTS_REQUEST, LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
    // scrollY: 처음부터 제일 밑으로 내일 위치에서 상단까지의 높이(스크롤 내린 거리)
    // clientHeight: 상단까지의 높이에서 스크롤을 제외한 하단까지의 높이(화면높이)
    // scrollHeight: scrollY + clientHeight 값(전체 화면 길이)
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if(hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
          data: tag,
        })
      }
    }
  },[hasMorePost, mainPosts.length]);

  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => { // next가 임의로 추가해준 lifecycle, getInitialProps가 제일 먼저 실행됨.
  const tag = context.query.tag;
  console.log('hashtag getInitialProps', tag);
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag: context.query.tag }; // _app.js로  tag 리턴, component의 props로 만들어줌.
};

export default Hashtag;
