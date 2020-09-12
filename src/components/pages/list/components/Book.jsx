import React from 'react';

const Book = ({ info, deleteBook }) => {
  const { isbn, title, author, rate, cover } = info;

  return (
    <div>
      <img src={cover} alt={title} />
      <span>{title}</span>
      <span>{author}</span>
      <button onClick={() => deleteBook(isbn)}>X</button>
    </div>
  );
};

export default Book;
