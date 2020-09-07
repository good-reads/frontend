import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Search = ({ isLoading, searchBooks, updateSearchKeyword, history }) => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = e => {
    e.preventDefault();
    searchBooks(keyword);
    updateSearchKeyword(keyword);
    history.push('/search');
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="찾고 싶은 책을 입력해주세요"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      {isLoading && '로딩중...'}
    </form>
  );
};

export default withRouter(Search);
