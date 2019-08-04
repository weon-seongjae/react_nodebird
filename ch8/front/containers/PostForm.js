import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import { backUrl } from '../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
  const imageInput = useRef();

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) { // trim() 공백제거 함수
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i); // 이미지 넣는 곳
    });
    formData.append('content', text); // 컨텐트 넣는 곳
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  // === ajax 전송방법(이미지만 미리 올리는 작업)============================
  const onChangeImages = useCallback((e) => {
    console.log(e.target.files); // 파일들이 들어있는 곳
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // key: image, value: f, routes/post.js에서 upload.array()에 append의 이름이 들어감.
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  // ===================================================================

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click(); // 버튼을 눌었을 때 이벤트 발생
  }, [imageInput.current]);

  const onRemoveImage = useCallback(index => () => { // onRemoveImage 메소드에 괄호가 불어있으므로 () => () => 를 사용함.(고차함수)
    dispatch({
      type: REMOVE_IMAGE,
      index,
    });
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
