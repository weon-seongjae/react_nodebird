import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s]+)/g).map((v) => { // 해시태그를 넣고 쪼개는 regex
      if (v.match(/#[^\s]+/)) { // 쪼갠 배열이 해시태그면
        return (
          <Link
            href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
            as={`/hashtag/${v.slice(1)}`}
            key={v}
          >
            <a>{v}</a>
          </Link> // 링크로 바꿔준다.
        // 프론트 주소는 href안에, 서버쪽 주소는 as안에 써준다.
        );
      }
      return v; // 쪼갠 배열이 해시태그가 아니면 그냥 문자열로 반환
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
