import React from 'react';

import * as Icons from '../../../icons/Icons';

const Book = ({ info, deleteBook }) => {
  const { isbn, title, author, rate, cover } = info;

  return (
    <div className="book-info">
      <div className="book-info__inner">
        <button className="book-info__remove" onClick={() => deleteBook(isbn)}>
          <Icons.CloseIcon />
        </button>
        <div className="book-info__inner-image">
          <img className="book-info__image" src={cover} alt={title} />
        </div>

        <div className="book-info__inner-detail">
          <span className="book-info__item book-info__title">{title}</span>
          <span className="book-info__item book-info__author">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
