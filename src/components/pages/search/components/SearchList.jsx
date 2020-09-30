import React from 'react';

import SearchListEntry from './SearchListEntry';

const SearchList = ({ books, keyword }) => {
  const { length } = books;
  return (
    <div className="search-list">
      {length > 0 ? (
        <>
          <span className="list__result-count no-drag">
            "{keyword}"에 대한 {books.length} 권을 찾았습니다
          </span>
          <div className="list__inner">
            {books.map(book => (
              <SearchListEntry key={book.isbn} book={book} />
            ))}
          </div>
        </>
      ) : (
        <span className="list__no-item">검색된 책이 없어요!</span>
      )}
    </div>
  );
};

export default SearchList;
