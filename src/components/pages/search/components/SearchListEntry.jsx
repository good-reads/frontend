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
    <div onClick={showDetail}>
      <div>
        <img src={cover} alt={`${title} 사진`} />
      </div>
      <div>
        <span>{title}</span>
        <span>{author}</span>
      </div>
      <div>{/* 리스트에 있는지 */}</div>
    </div>
  );
};

export default withRouter(SearchListEntry);
