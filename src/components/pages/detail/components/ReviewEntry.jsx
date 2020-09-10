import React, { useState } from 'react';
import axios from 'axios';

const ReviewEntry = ({ review, isbn }) => {
  console.log('REVIEW>>', review);
  const token = localStorage.getItem('authorization');

  const BASE_URL =
    'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books';
  const [info, setInfo] = useState({
    id: review.id,
    content: review.content,
    user: review.user,
  });
  const [reviewContent, setReviewContent] = useState(info.content);
  const [isEdit, setIsEdit] = useState(false);
  const userId = localStorage.getItem('userId');
  console.log(info.user, userId);
  // id: review_id
  // user: user_id

  const deleteReview = async () => {
    try {
      console.log('will remove ', info.id);
      const result = await axios({
        url: `${BASE_URL}/delete/review/`,
        method: 'delete',
        data: {
          review_id: info.id,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log('>>', result);
      setInfo({ id: '', content: '', user: '' });
    } catch (error) {
      console.log(error.response);
    }
  };

  const editReview = async () => {
    // /update/review/
    setIsEdit(!isEdit);

    try {
      const { data, status } = await axios({
        url: `${BASE_URL}/create/review/`,
        method: 'PATCH',
        data: {
          review_id: info.id,
          book: isbn,
          content: reviewContent,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setInfo({
        ...info,
        content: reviewContent,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ul>
      <li>{info.user}</li>
      {isEdit && (
        <input
          placeholder={info.content}
          value={reviewContent}
          onChange={e => setReviewContent(e.target.value)}
        />
      )}
      {!isEdit && <li>{info.content}</li>}

      {info.user === Number(userId) && (
        <button onClick={deleteReview}>X</button>
      )}
      {info.user === Number(userId) && (
        <button onClick={() => editReview()}>{isEdit ? '저장' : '수정'}</button>
      )}
    </ul>
  );
};

export default ReviewEntry;
