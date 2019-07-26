import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  console.log(tag);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

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
