import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { mainPosts } = useSelector(state => state.post);
  // const dispatch = useDispatch(); // react를 연결하려는 경우 useDispatch, setState와 동일한 기능은 useDispatch
  const { me } = useSelector(state => state.user); // redux state 갖다 쓰고 싶을 때 useSelect, react의 useState개념
  // console.log(user);
  const dispatch = useDispatch();

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(c => (
        <PostCard key={c} post={c} />
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
