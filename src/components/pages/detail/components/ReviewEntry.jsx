import React, { useState } from 'react';
import axios from 'axios';

const ReviewEntry = ({ review }) => {
  console.log('REVIEW>>', review);
  const BASE_URL =
    'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books';
  const [info, setInfo] = useState({
    id: review.id,
    content: review.content,
    user: review.user,
  });
  const userId = localStorage.getItem('userId');
  console.log(info.user, userId);
  // id: review_id
  // user: user_id

  const deleteReview = async () => {
    const token = localStorage.getItem('authorization');

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

  const editReview = () => {
    // /update/review/
    axios.patch(`${BASE_URL}/update/review/`);
  };
  return (
    <ul>
      <li>{info.user}</li>
      <li>{info.content}</li>
      {info.user === Number(userId) && (
        <button onClick={deleteReview}>X</button>
      )}
      {info.user === Number(userId) && <button>수정</button>}
    </ul>
  );
};

export default ReviewEntry;
