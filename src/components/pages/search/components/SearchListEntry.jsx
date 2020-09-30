import React from 'react';
import { withRouter } from 'react-router-dom';

const SearchListEntry = ({ book, history }) => {
  const { author, cover, title, isbn } = book;
  const showDetail = () => {
    history.push({
      pathname: '/detail',
      state: { isbn },
    });
  };
  return (
    <div className="list__item" onClick={showDetail}>
      <div className="item__image">
        <img src={cover} alt={`${title} 사진`} />
      </div>
      <div className="item__detail">
        <span className="item__info item__title">{title}</span>
        <span className="item__info item__author">{author}</span>
      </div>
      <div>{/* 리스트에 있는지 */}</div>
    </div>
  );
};

export default withRouter(SearchListEntry);
