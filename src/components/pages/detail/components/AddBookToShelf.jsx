import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Shelf = ({ shelf, isbn }) => {
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
    } else {
      // 선택이 안되어있던 책이라면, 리스트에 추가한다
    }
    setIsAlreadAdd(!isAlreadyAdd);
  };
  return (
    <>
      <span>{list_name}</span>
      <input
        type="checkbox"
        checked={isAlreadyAdd}
        onChange={handleChangeCheckbox}
      />
    </>
  );
};

const Shelves = ({ isbn }) => {
  const { shelves } = useSelector(({ shelf }) => shelf);
  return (
    <div>
      <ul>
        {shelves.map(shelf => (
          <li key={shelf.id}>
            <Shelf shelf={shelf} isbn={isbn} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddBookToShelf = ({ isbn }) => {
  const [addBookToShelfIsOpen, setAddBookToShelfIsOpen] = useState(true);
  const handleAddBookToShelf = () => {
    setAddBookToShelfIsOpen(!addBookToShelfIsOpen);
  };
  return (
    <div>
      <button onClick={handleAddBookToShelf}>리스트에 추가하기</button>
      {addBookToShelfIsOpen && <Shelves isbn={isbn} />}
    </div>
  );
};

export default AddBookToShelf;
