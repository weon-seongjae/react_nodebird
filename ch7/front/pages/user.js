import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../components/PostCard';

const User = ({ id }) => { // 서버에서 받아온 getInitialProps를 프론트로 전달
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  // == 남의 정보와 게시글 가져오기 =====================
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);
  // ================================================
  return (
    <div>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => { // next가 임의로 추가해준 lifecycle, getInitialProps가 제일 먼저 실행됨. 서버사이드 렌더링의 핵심
  console.log('user getInitialProps', context.query.id);
  return { id: parseInt(context.query.id, 10) };
};

export default User;
