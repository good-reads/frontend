import React from 'react';

const SearchListEntry = ({ book }) => {
  const { author, cover, title } = book;
  return (
    <div>
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

export default SearchListEntry;
