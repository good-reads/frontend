import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/books/get/details';

const BookDetail = ({ info }) => {
  // 책 1권에 대한 모든 정보 받아오는 api 사용하기

  const { isbn } = info;
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
  // const {title, author, description, publisher, pubdate, cover, reviews, rate} =
  const getBookData = useCallback(async () => {
    const token = localStorage.getItem('authorization');

    try {
      const { data, status } = await axios.get(`${BASE_URL}/`, {
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
      }
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line no-use-before-define
  }, [isbn]);

  useEffect(() => {
    getBookData();
  }, [getBookData]);

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
      <button>+</button>
      <div>
        <h1>리뷰</h1>
        {/* 평점 */}
        <div>
          <input type="text" />
          <button>등록</button>
        </div>
        <ul>
          {detail.reviews.map(review => (
            <li>{review}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
