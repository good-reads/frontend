import React from 'react';

import SearchListEntry from './SearchListEntry';

const SearchList = ({ books, keyword }) => {
  const { length } = books;
  return (
    <>
      {length > 0 ? (
        <>
          <span>
            {keyword}에 대한 {books.length} 권을 찾았습니다
          </span>
          {books.map(book => (
            <SearchListEntry key={book.isbn} book={book} />
          ))}
        </>
      ) : (
        <span>검색된 책이 없어요!</span>
      )}
    </>
  );
};

export default SearchList;
