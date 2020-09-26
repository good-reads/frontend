import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import ReviewEntry from './ReviewEntry';
import AddBookToShelf from './AddBookToShelf';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books';

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

  useEffect(() => {
    getBookData();
  }, [getBookData]);

  const submitRate = async idx => {
    updateLikeStars(idx);

    const result = await axios.put(
      `${BASE_URL}/create/rate/`,
      { book_isbn: isbn, score: idx + 1 },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    console.log(result);
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

    console.log('hi');
  };

  return (
    <div>
      <img src={detail.cover} alt="title" />
      <div>
        <h1>{detail.title}</h1>
        <h2>{detail.author}</h2>
        <h3>{detail.rate}</h3>
        <h3>{detail.publisher}</h3>
        <h3>{detail.pubdate}</h3>
        <p>{detail.description}</p>
      </div>
      <AddBookToShelf isbn={isbn} />
      <div>
        <h1>리뷰</h1>
        <div>
          {likeStars.map((star, idx) =>
            star ? (
              <StarIcon onClick={() => submitRate(idx)} />
            ) : (
              <StarBorderIcon onClick={() => submitRate(idx)} />
            )
          )}
        </div>
        <div>
          <form onSubmit={handleReview}>
            <input
              type="text"
              value={review}
              onChange={e => setReview(e.target.value)}
            />
            <button>등록</button>
          </form>
        </div>
        <ul>
          {detail.reviews.map(review => (
            <ReviewEntry key={review.id} review={review} isbn={isbn} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
