import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ReviewEntry from './ReviewEntry';
import AddBookToShelf from './AddBookToShelf';
import * as Icons from '../../../icons/Icons';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books';

const Rate = ({ rate }) => {
  rate = Math.floor(rate);
  const ret = [];
  for (let i = 0; i < rate; i++) {
    ret.push(true);
  }
  for (let i = rate; i < 5; i++) {
    ret.push(false);
  }
  return (
    <>
      {ret.map((item, idx) => (item ? <Icons.StarIcon key={idx} /> : <Icons.StarBorderIcon key={idx} />))}
    </>
  );
};

const BookDetail = ({ info }) => {
  // 책 1권에 대한 모든 정보 받아오는 api 사용하기
  const token = localStorage.getItem('authorization');
  const { isbn } = info;
  const [likeStars, setLikeStars] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [detail, setDetail] = useState({
    title: '',
    author: '',
    description: '',
    publisher: '',
    pubdate: '',
    cover: '',
    reviews: [],
    rate: 0,
  });
  const [review, setReview] = useState('');

  const updateLikeStars = useCallback(
    idx => {
      const tempLikeStars = [];

      idx = Math.floor(idx);

      for (let i = 0; i < idx + 1; i++) tempLikeStars.push(true);
      for (let i = idx + 1; i < likeStars.length; i++)
        tempLikeStars.push(false);

      setLikeStars([...tempLikeStars]);
    },
    [likeStars.length]
  );

  const getBookData = useCallback(async () => {
    const token = localStorage.getItem('authorization');

    try {
      const { data, status } = await axios.get(`${BASE_URL}/get/details/`, {
        params: {
          isbn,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (status === 200) {
        const {
          author,
          cover,
          description,
          pubdate,
          publisher,
          rate,
          reviews,
          title,
        } = data;
        setDetail({
          author,
          cover,
          description,
          pubdate,
          publisher,
          rate,
          reviews,
          title,
        });

        updateLikeStars(rate - 1);
      }
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line no-use-before-define
  }, [isbn, updateLikeStars]);

  const removeReview = (review) => {
    const newReviews = detail.reviews.filter((rv) => rv.id !== review.id)
    setDetail({
      ...detail,
      reviews: newReviews
    })
  }

  useEffect(() => {
    getBookData();
  }, [getBookData]);

  const replaceText = text => {
    const regexs = [
      { regex: /(&#x0D;)/gm, to: ' ' },
      {
        regex: /(&lt;)/gm,
        to: '<',
      },
      {
        regex: /(&gt;)/gm,
        to: '>',
      },
    ];
    regexs.forEach(({ regex, to }) => {
      text = text.replace(regex, to);
    });
    return text;
  };

  const submitRate = async idx => {
    updateLikeStars(idx);

    const result = await axios.put(
      `${BASE_URL}/create/rate/`,
      { book_isbn: isbn, score: idx + 1 },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };

  const handleReview = async e => {
    e.preventDefault();

    try {
      const { data, status } = await axios({
        url: `${BASE_URL}/create/review/`,
        method: 'PUT',
        data: {
          book: isbn,
          content: review,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setReview('');
      getBookData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail__inner-main">
        <img className="book-detail__image" src={detail.cover} alt="title" />
        <AddBookToShelf isbn={isbn} />
        <div className="book-detail__info">
          <span className="info__item info__title">{detail.title}</span>
          <span className="info__item info__author">
            {detail.author} (지은이)
          </span>
          <span className="info__item info__publisher">{detail.publisher}</span>
          <span className="info__item info__pubdate">{detail.pubdate}</span>

          <span className="info__item info__rate">
          {
            detail.rate === 0 ? 
              ("아직 평점이 없습니다") :
              (
                <>
                  <Rate rate={detail.rate} /> ({detail.rate})
                </>
              )
          }
          </span>

        </div>
      </div>
      <div className="book-detail__inner-sub">
        <span className="info__item info__description">
          {replaceText(detail.description)}
        </span>
      </div>

      <div className="book-detail__review">
        <h1 className="review__header">100자평</h1>
        <div className="review__stars">
          {likeStars.map((star, idx) =>
            star ? (
              <Icons.StarIcon key={idx} onClick={() => submitRate(idx)} />
            ) : (
              <Icons.StarBorderIcon key={idx} onClick={() => submitRate(idx)} />
            )
          )}
        </div>
        <div className="review__text">
          <form onSubmit={handleReview}>
            <input
              className="text__input"
              type="text"
              value={review}
              onChange={e => setReview(e.target.value)}
              maxLength={100}
            />
            <button className="text__submit">
              <Icons.SaveIcon />
            </button>
          </form>
        </div>
        <ul>
          {detail.reviews.map((review, idx) => (
            <ReviewEntry key={idx} handleRemoveReview={removeReview} key={review.id} review={review} isbn={isbn} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
