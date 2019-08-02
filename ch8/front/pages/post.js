import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'; // head tag에 들어가는 것들을 관리해 주는 라이브러리
import { LOAD_POST_REQUEST } from '../reducers/post';
import {backUrl} from '../config/config';

const Post = ({ id }) => {
  const { singlePost } = useSelector(state => state.post);
  return (
    <>
      <Helmet
        title={`${singlePost.User.nickname}님의 글`}
        description={singlePost.content}
        meta={[{
          name: 'description', content: singlePost.content,
        }, {
          property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`, // og: open graph
        }, {
          property: 'og:description', content: singlePost.content,
        }, {
          property: 'og:image', content: singlePost.Images[0] && `http://3.130.41.181/${singlePost.Images[0].src}`,
        }, {
          property: 'og:url', content: `http://3.130.67.120/post/${id}`,
        }]}
      />
      <div itemScope="content">{singlePost.content}</div>
      <div itemScope="author">{singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && <img src={`${backUrl}/${singlePost.Images[0].src}`} />}
      </div>
    </>
  );
};

Post.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Post;
