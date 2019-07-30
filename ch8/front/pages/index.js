import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../containers/PostForm';
import PostCard from '../containers/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  // const dispatch = useDispatch(); // react를 연결하려는 경우 useDispatch, setState와 동일한 기능은 useDispatch
  const { me } = useSelector(state => state.user); // redux state 갖다 쓰고 싶을 때 useSelect, react의 useState개념
  // console.log(user);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
    // scrollY: 처음부터 제일 밑으로 내일 위치에서 상단까지의 높이(스크롤 내린 거리)
    // clientHeight: 상단까지의 높이에서 스크롤을 제외한 하단까지의 높이(화면높이)
    // scrollHeight: scrollY + clientHeight 값(전체 화면 길이)
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1].id,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(c => (
        <PostCard key={c.id} post={c} />
      ))}
    </div>
  );
};

Home.getInitialProps = async (context) => { // pageProps = await Component.getInitialProps(ctx);가 들어감.
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
