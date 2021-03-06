import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchListEntry = ({ book, scrollPosition }) => {
  const history = useHistory();
  const { author, cover, title, isbn } = book;
  const showDetail = () => {
    history.push({
      pathname: '/detail',
      state: { isbn },
    });
  };

  return (
    <div className="list__item" onClick={showDetail}>
      {!!cover ? (
        <img
          className="item__image item__image--exist"
          loading="lazy"
          height="100px"
          src={cover}
          alt={`${title} 사진`}
        />
      ) : (
        <img className="item__image item__image--none" />
      )}

      {/* </div> */}
      <div className="item__detail">
        <span className="item__info item__title">{title}</span>
        <span className="item__info item__author">{author}</span>
      </div>
      <div>{/* 리스트에 있는지 */}</div>
    </div>
  );
};

export default SearchListEntry;
