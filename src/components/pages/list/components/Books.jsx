import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Book from './Book';
import { shelfActions } from '../../../../modules/shelf';

const Books = ({ list_id }) => {
  const dispatch = useDispatch();
  const { shelves } = useSelector(({ shelf }) => shelf);

  const deleteBook = async isbn => {
    dispatch(
      shelfActions.removeBookFromShelf({
        list_id,
        isbn,
      })
    );
  };

  return (
    <div className="list-page__books">
      {shelves[list_id].booklist.map(info => (
        <Book info={info} deleteBook={deleteBook} />
      ))}
    </div>
  );
};

export default Books;
