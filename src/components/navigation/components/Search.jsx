import React, { useState } from 'react';

const Search = ({ isLoading, searchBooks }) => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = e => {
    e.preventDefault();
    searchBooks(keyword);
    console.log(isLoading);
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="찾고 싶은 책을 입력해주세요"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default Search;
