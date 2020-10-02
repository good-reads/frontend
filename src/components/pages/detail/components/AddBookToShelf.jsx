import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { shelfActions } from '../../../../modules/shelf';
import * as Icons from '../../../icons/Icons';

const Shelf = ({ shelf, isbn }) => {
  const dispatch = useDispatch();

  const { id, list_name, booklist } = shelf;
  const reducer = (acc, curr) => {
    acc.push(curr.isbn);
    return acc;
  };
  const [isAlreadyAdd, setIsAlreadAdd] = useState(
    booklist.reduce(reducer, []).includes(isbn)
  );

  const handleChangeCheckbox = e => {
    if (isAlreadyAdd) {
      // 이미 선택이 되어있던 책이라면, 리스트에서 제거한다
      dispatch(
        shelfActions.removeBookFromShelf({
          list_id: id,
          isbn,
        })
      );
    } else {
      // 선택이 안되어있던 책이라면, 리스트에 추가한다
      dispatch(
        shelfActions.addBookToShelf({
          list_id: id,
          isbn,
        })
      );
    }
    setIsAlreadAdd(!isAlreadyAdd);
  };
  return (
    <div className="shelf">
      <span>{list_name}</span>
      <input
        type="checkbox"
        checked={isAlreadyAdd}
        onChange={handleChangeCheckbox}
      />
    </div>
  );
};

const Shelves = ({ isbn }) => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  return (
    <div className="shelves">
      {Object.keys(shelves).map(id => (
        <Shelf key={shelves[id].id} shelf={shelves[id]} isbn={isbn} />
      ))}
    </div>
  );
};

const AddBookToShelf = ({ isbn }) => {
  const [addBookToShelfIsOpen, setAddBookToShelfIsOpen] = useState(true);
  const handleAddBookToShelf = () => {
    setAddBookToShelfIsOpen(!addBookToShelfIsOpen);
  };
  return (
    <div className="add-book-to-shelf">
      <button
        className="add-book-to-shelf__button"
        onClick={handleAddBookToShelf}
      >
        <Icons.PlusIcon />
      </button>
      {addBookToShelfIsOpen && <Shelves isbn={isbn} />}
    </div>
  );
};

export default AddBookToShelf;
