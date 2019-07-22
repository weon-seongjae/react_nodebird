import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, Comment, Form, Icon, Input, List, Popover } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_COMMENTS_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST
} from '../reducers/post';
import PostImages from './PostImages';
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev); // 펼쳐져 있으면 닫고, 닫혀져 있으면 펼침
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
  }, []);

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
  }, [me && me.id, commentText]);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onToggleLike = useCallback(() => {
    if(!me) {
      return alert('로그인이 필요합니다.');
    }
    if (liked) { // 좋아요를 누른 상태
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      })
    } else { // 좋아요 누르지 않은 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  },[me && me.id, post && post.id, liked]);

  // 리트윗 만들기 =============================
  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch ({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  },[me && me.id, post && post.id])
  // =========================================

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        // 커버라는 속성으로 이미지를 가져올 수 있음
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor='#eb2f96'
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key='ellipsis'
            content={(
              <Button.Group>
                {me && post.UserId === me.id
                ? (
                  <>
                    <Button>수정</Button>
                    <Button type='danger'>삭제</Button>
                  </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <Icon type='ellipsis' />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={<Button>팔로우</Button>}
      >
        {post.RetweetId && post.Retweet
          ? (
          // 리트윗을 한 경우
          <Card
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
          >
            <Card.Meta
              avatar={(
                <Link
                  href={{ pathname: '/user', query: { id: post.Retweet.User.id } }}
                  as={`/user/${post.Retweet.User.id}`}
                >
                  <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                </Link>
              )} // 게시글의 avatar
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />} // 게시글 컨텐트. a 태그로 바꾸는 게 아니라 next의 Link태그로 바꿔야 함.
            />
          </Card>
          )
          : ( // 리트윗을 하지 않은 경우
            <Card Meta
              avatar={(
                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                  <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                </Link>
              )} // 게시글의 avatar
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />} // 게시글 컨텐트. a 태그로 바꾸는 게 아니라 next의 Link태그로 바꿔야 함.
            />
              )}
            </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                    )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};

export default PostCard;
