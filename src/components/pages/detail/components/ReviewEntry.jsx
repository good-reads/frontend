import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import * as Icons from '../../../icons/Icons';

const ReviewEntry = ({ review, isbn }) => {
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
  const userId = useSelector(({ user }) => user.informations.id);
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
    <div className="review">
      <div className="review__inner">
        {isEdit && (
          <input
            clasName="review__input"
            placeholder={info.content}
            value={reviewContent}
            onChange={e => setReviewContent(e.target.value)}
          />
        )}
        {!isEdit && <span className="review__content">{info.content}</span>}

        <div className="review__button">
          {info.user === Number(userId) && (
            <button
              className="button__item button__delete"
              onClick={deleteReview}
            >
              <Icons.CloseIcon />
            </button>
          )}

          {info.user === Number(userId) && (
            <button
              className="button__item button__modify"
              onClick={() => editReview()}
            >
              {isEdit ? <Icons.SaveIcon /> : <Icons.EditIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewEntry;
