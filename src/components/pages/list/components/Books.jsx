import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Book from './Book';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/accounts/list';
const token = localStorage.getItem('authorization');

const Books = ({ list_id, booklist }) => {
  const [books, setBooks] = useState([...booklist]);

  useEffect(() => {
    console.log('hi');
  }, [books]);

  const deleteBook = async isbn => {
    console.log('delete book');

    try {
      const { data, status } = await axios({
        url: `${BASE_URL}/edit/`,
        method: 'PUT',
        data: {
          type: 'SUB',
          list_id,
          booklist: [isbn],
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setBooks(books.filter(book => book.isbn !== isbn));
    } catch (error) {
      console.log(error.response);
    }

    // PUT
    // {
    //     "type": "SUB",
    //     "list_id": 2,
    //     "booklist": [
    //         2
    //     ]
    // }
  };

  return (
    <>
      {books.map(info => (
        <Book info={info} deleteBook={deleteBook} />
      ))}
    </>
  );
};

export default Books;
